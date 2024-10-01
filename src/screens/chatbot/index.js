import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import './styles.sass';
import { host } from '../../services/config';

const Chatbot = () => {
  const [step, setStep] = useState(0); // Controla el paso de la entrevista
  const [language, setLanguage] = useState(''); // Almacena el lenguaje
  const [experience, setExperience] = useState(''); // Almacena los años de experiencia
  const [technologies, setTechnologies] = useState(''); // Almacena las tecnologías
  const [input, setInput] = useState(''); // Almacena el input del usuario
  const token = localStorage.getItem('token');
  const [isInterviewFinished, setIsInterviewFinished] = useState(false); // Indica si la entrevista ha finalizado
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bienvenido a la entrevista técnica!' },
    { sender: 'bot', text: '¿En qué lenguaje quieres tu entrevista?' }
  ]);
  const [questionId, setQuestionId] = useState(null); // Almacena el ID de la pregunta actual

  // Referencia para el chat window
  const chatWindowRef = useRef(null);  // Definir la referencia para la ventana de chat

  // Función para enviar la respuesta del usuario
  const sendMessage = async () => {
    console.log('Intentando enviar mensaje:', input);
  
    if (input.trim() === '') {
      console.log('Mensaje vacío, no se enviará');
      return; // Evitar enviar respuestas vacías
    }
  
    const userMessage = { sender: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const normalizedInput = input.trim().toLowerCase(); // Normalizar el input del usuario
  
    console.log('Paso actual:', step);
  
    // Si estamos en el paso 0, pedimos el lenguaje
    if (step === 0) {
      const languageMap = {
        'español': 'Spanish',
        'spanish': 'Spanish',
        'inglés': 'English',  // Aquí corregimos para que "inglés" y sus variaciones se mapeen a "Spanish"
        'ingles': 'English',  // Variación sin acento
        'english': 'English'
      };
  
      const normalizedLanguage = languageMap[normalizedInput] || normalizedInput;
  
      if (normalizedLanguage !== 'Spanish' && normalizedLanguage !== 'English') {
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Por favor, selecciona un idioma válido: español o inglés.' }]);
        return;
      }
  
      setLanguage(normalizedLanguage); // Guardamos el idioma seleccionado
      setStep(1); // Avanzamos al paso 1
      const nextMessage = normalizedLanguage === 'Spanish' 
        ? '¿Cuántos años tienes de experiencia?' 
        : 'How many years of experience do you have?';
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: nextMessage }]);
    } 
    // Si estamos en el paso 1, capturamos los años de experiencia
    else if (step === 1) {
      setExperience(Number(input)); // Guardamos la experiencia (convertida a número)
      setStep(2); // Avanzamos al paso 2
      const nextMessage = language === 'Spanish' 
        ? '¿En qué tecnologías tienes experiencia? (separadas por comas)' 
        : 'Which technologies do you have experience with? (separated by commas)';
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: nextMessage }]);
    } 
    // Si estamos en el paso 2, capturamos las tecnologías y las normalizamos
    else if (step === 2) {
      const normalizedTechnologies = input.split(',')
        .map(tech => tech.trim().toLowerCase())
        .filter(tech => tech !== ''); // Eliminamos entradas vacías
  
      if (normalizedTechnologies.length === 0) {
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Por favor, introduce al menos una tecnología.' }]);
        return;
      }
  
      setTechnologies(normalizedTechnologies); // Guardamos las tecnologías ingresadas
      await sendInitialData(normalizedTechnologies); // Enviamos los datos iniciales al backend
      setStep(3); // Avanzamos al siguiente paso
    }
    
    setInput(''); // Limpiamos el input del usuario después de cada paso
  };
  

  // Envía las respuestas iniciales al backend
  const sendInitialData = async (technologies) => {
    const userData = {
      language: language, // Idioma seleccionado
      experience: Number(experience), // Años de experiencia capturados
      technologies: technologies // Tecnologías ingresadas por el usuario
    };
  
    try {
      // Aquí hacemos la llamada al backend solo con `userData`
      const response = await fetch(`${host}/interview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData) // Enviamos solo los datos necesarios
      });
  
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
  
      const responseData = await response.json();
  
      console.log('Respuesta del backend:', responseData);
  
      if (responseData.question) {
        // Guardamos la primera pregunta recibida si existe
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: responseData.question }]);
        setQuestionId(responseData.question_id); // Guardamos el ID de la primera pregunta
      }
    } catch (error) {
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Error al enviar el mensaje' }]);
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

      if (response.message === "Entrevista finalizada") {
        // Concatenamos el mensaje final de la entrevista en un solo mensaje con saltos de línea
        const finalMessage = `Entrevista finalizada.\nPuntuación total: ${response.total_score}\nNivel alcanzado: ${response.level}`;
        
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'bot', text: finalMessage }  // Agregamos un solo mensaje concatenado
        ]);

        // Opcional: Desactivar el input si la entrevista ha finalizado
        setIsInterviewFinished(true);
      } else {
        // Mostrar la retroalimentación y la siguiente pregunta, si no es el final de la entrevista
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'bot', text: response.feedback }
        ]);

        if (response.score) {
          setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'bot', text: `Puntuación: ${response.score}` }
          ]);
        }

        // Actualizar con la siguiente pregunta
        setQuestionId(response.question_id);
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'bot', text: response.question }
        ]);
      }
    } catch (error) {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'bot', text: 'Error sending message' }
      ]);
      console.error('Error:', error);
    }
  };

  // useEffect para scroll automático en la ventana de chat
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendChatMessage = async (message, isInitial, questionId, userData) => {
    try {
      // Aquí puedes hacer una llamada HTTP usando fetch o axios
      const response = await fetch(`${host}/interview`, {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          isInitial: isInitial,
          questionId: questionId,
          userData: userData
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error en sendChatMessage:', error);
      throw error;
    }
  };

  return (
    <div className="Chatbot">
  <div className="ChatWindow" ref={chatWindowRef}>
    {messages.map((msg, index) => (
      <div key={index} className={msg.sender === 'bot' ? 'BotMessage' : 'UserMessage'}>
        {msg.text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    ))}
  </div>

  {!isInterviewFinished && (
    <div className='Input'>
      <input
        type="text"
        value={input}
        placeholder={
          step === 0 ? '¿En qué lenguaje quieres tu entrevista? (inglés o español)' :
          step === 1 ? (language === 'Spanish' ? '¿Cuántos años tienes de experiencia?' : 'How many years of experience do you have?') :
          step === 2 ? (language === 'Spanish' ? '¿En qué tecnologías tienes experiencia?' : 'Which technologies do you have experience with?') :
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