// Chatbot.js
import React, { useState, useEffect } from 'react';
import { sendChatMessage } from '../../services/ChatServices'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'; 
import './styles.sass';

// Definir la clase Mensaje
class Mensaje {
  constructor(tipo, mensaje) {
    this.tipo = tipo;
    this.mensaje = mensaje;
    this.enviado = new Date().toLocaleTimeString(); // Hora de envío
  }
}

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Enviar un mensaje inicial para iniciar la conversación
    sendMessage("start");
    setScore(0);
  }, []);

  const sendMessage = async (message) => {
    const userMessage = new Mensaje('user', message); // Crear instancia de Mensaje para el usuario
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const response = await sendChatMessage(message);
      const botMessage = new Mensaje('bot', response.response); // Crear instancia de Mensaje para el bot
      setMessages(prevMessages => [...prevMessages, botMessage]);

      if (response.next) {
        const botMessageNext = new Mensaje('bot', response.next); // Siguiente mensaje del bot si existe
        setMessages(prevMessages => [...prevMessages, botMessageNext]);
      }
    } catch (error) {
      const errorMessage = new Mensaje('error', 'Error sending message'); // Crear instancia de Mensaje para error
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }

    setInput('');
  };

  // Función que aplica estilos según el tipo y contenido del mensaje
  const getMessageStyle = (msg) => {
    const lowerCaseText = msg.mensaje?.toLowerCase();
    
    if (msg.tipo === 'user') {
      return 'userMessage message'; // Clase CSS para mensajes del usuario
    } else if (msg.tipo === 'error') {
      return 'errorMessage message'; // Clase CSS para mensajes de error del bot
    } else if (msg.tipo === 'bot') {
      return 'botMessage message'; // Clase CSS para mensajes de error del bot
    }
    else if (lowerCaseText.includes('score')) {
      return 'scoreMessage message'; // Clase CSS para mensajes de score del bot
    }
    return ''; // Clase vacía si no se encuentra coincidencia
  };

  return (
    <div className='Chatbot'>
      <div className='Score'>Total Score: {score}</div>
      <div className='Chat'>
        {messages.map((msg, index) => (
          <div key={index} className={`${msg.tipo} ${getMessageStyle(msg)}`}>
            <div className='content'>{msg.mensaje}</div>
            {
              msg.tipo !== 'error' ?
              <div className="timestamp">{msg.enviado}</div>
              : null
            }
          </div>
        ))}
      </div>
      <div className='Input'>
        <input
          type="text"
          value={input}
          placeholder='Escribe tu mensaje'
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') sendMessage(input);
          }}
        />
        <button className='Send' onClick={() => sendMessage(input)}>
          <p><FontAwesomeIcon icon={faCircleRight} /></p>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
