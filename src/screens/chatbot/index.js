import React, { useState, useEffect } from 'react';
import { sendChatMessage } from '../../services/ChatServices'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'; 
import './styles.sass';

const Chatbot = () => {
  const [step, setStep] = useState(0); // Controla el paso de la entrevista
  const [language, setLanguage] = useState(''); // Almacena el lenguaje
  const [experience, setExperience] = useState(''); // Almacena los años de experiencia
  const [technologies, setTechnologies] = useState(''); // Almacena las tecnologías
  const [input, setInput] = useState(''); // Almacena el input del usuario
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Bienvenido a la entrevista técnica!' }]);
  const [questionId, setQuestionId] = useState(null); // Almacena el ID de la pregunta actual para enviar las respuestas correctas al backend

  // Maneja el envío de respuestas del usuario
  const sendMessage = async () => {
    // Verifica que el input no esté vacío
    if (input.trim() === '') {
      return; // Evitar enviar respuestas vacías
    }
  
    const userMessage = { sender: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);  // Mostrar mensaje del usuario en la ventana de chat
  
    // Si estamos en el paso 0, pedimos el lenguaje
    if (step === 0) {
      setLanguage(input); // Guardar el lenguaje del input
      setStep(1);
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: '¿Cuántos años tienes de experiencia?' }]);
    } 
    // Si estamos en el paso 1, pedimos la experiencia
    else if (step === 1) {
      setExperience(input); // Guardar la experiencia del input
      setStep(2);
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: '¿En qué tecnologías tienes experiencia? (separadas por comas)' }]);
    } 
    // Si estamos en el paso 2, pedimos las tecnologías y enviamos los datos al backend
    else if (step === 2) {
      setTechnologies(input.split(',').map(tech => tech.trim())); // Guardar las tecnologías y procesarlas como una lista
      await sendInitialData(); // Enviar los datos iniciales al backend
      setStep(3); // Pasamos a esperar las preguntas técnicas
    } 
    // Si estamos en el paso de la entrevista técnica
    else if (step === 3) {
      console.log(input)
      await sendAnswerToQuestion(input); // Enviar la respuesta técnica antes de limpiar el input
    }
  
    // Limpiar el campo de entrada después de procesar el valor
    setInput('');
  };

  // Envía las respuestas iniciales al backend
// Envía las respuestas iniciales al backend
const sendInitialData = async () => {
  let technologiesArray = input.split(',').map(tech => tech.trim()).filter(tech => tech !== ''); // Asegúrate de eliminar valores vacíos

  if (technologiesArray.length === 0) {
    technologiesArray = ['None']; // Si el usuario no ha ingresado ninguna tecnología, asignamos un valor por defecto
  }

  const userData = {
    language: language, // Correcto lenguaje ingresado por el usuario
    experience: Number(experience), // Correcta experiencia ingresada por el usuario
    technologies: technologiesArray // Correctas tecnologías ingresadas por el usuario
  };

  try {
    const response = await sendChatMessage('', true, null, userData); // Pasamos los datos correctos al backend
    setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: response.response }]);

    // Guardar el ID de la primera pregunta y mostrarla
    setQuestionId(response.question_id);
    setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: response.question }]);
  } catch (error) {
    setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Error sending message' }]);
    console.error('Error:', error);
  }
};


  // Enviar la respuesta del usuario para la pregunta técnica
  const sendAnswerToQuestion = async (answer) => {
    const body = {
      answer: answer,  // Aquí se pasa la respuesta capturada del input
      question_id: questionId
    };
  
    console.log('Respuesta enviada al backend:', body);
  
    try {
      const response = await sendChatMessage(answer, false, questionId, body); // Enviar respuesta al backend
  
      // Mostrar la retroalimentación y la siguiente pregunta
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: response.feedback }]);
      if (response.score) {
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: `Puntuación: ${response.score}` }]);
      }
  
      // Actualizar con la siguiente pregunta
      setQuestionId(response.question_id);
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: response.question }]);
    } catch (error) {
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Error sending message' }]);
      console.error('Error:', error);
    }
  };

  return (
    <div className='Chatbot'>
      <div className='ChatWindow'>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'bot' ? 'BotMessage' : 'UserMessage'}>
            {msg.text}
          </div>
        ))}
      </div>

      {step < 4 && (
        <div className='Input'>
          <input
            type="text"
            value={input}
            placeholder={
              step === 0 ? '¿En qué lenguaje quieres tu entrevista? (inglés o español)' :
              step === 1 ? '¿Cuántos años tienes de experiencia?' :
              step === 2 ? '¿En qué tecnologías tienes experiencia? (separadas por comas)' :
              'Responde a la pregunta técnica...'
            }
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <button className='Send' onClick={sendMessage}>
            <FontAwesomeIcon icon={faCircleRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;