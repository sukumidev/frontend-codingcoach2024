import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://127.0.0.1:5000/chat', { message: message });
      const botMessage = { sender: 'bot', text: response.data.response };
      setMessages(prevMessages => [...prevMessages, botMessage]);

      if (response.data.next) {
        const botMessageNext = { sender: 'bot', text: response.data.next };
        setMessages(prevMessages => [...prevMessages, botMessageNext]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const botMessage = { sender: 'bot', text: 'Error sending message' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }

    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') sendMessage(input);
        }}
      />
      <button onClick={() => sendMessage(input)}>Send</button>
      <div>Total Score: {score}</div>
    </div>
  );
};

export default Chatbot;
