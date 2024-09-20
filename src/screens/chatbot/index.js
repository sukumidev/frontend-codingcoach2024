// Chatbot.js
import React, { useState, useEffect } from 'react';
import { sendChatMessage } from '../../services/ChatServices'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'; 
import './styles.sass';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Enviar un mensaje inicial para iniciar la conversación
    sendMessage("start");
  }, []);

  const sendMessage = async (message) => {
    const userMessage = { sender: 'user', text: message };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const response = await sendChatMessage(message);
      const botMessage = { sender: 'bot', text: response.response };
      setMessages(prevMessages => [...prevMessages, botMessage]);

      if (response.next) {
        const botMessageNext = { sender: 'bot', text: response.next };
        setMessages(prevMessages => [...prevMessages, botMessageNext]);
      }
    } catch (error) {
      const botMessage = { sender: 'bot', text: 'Error sending message' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }

    setInput('');
  };

  return (
    <div className='Chatbot'>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
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
      <div>Total Score: {score}</div>
    </div>
  );
};

export default Chatbot;
