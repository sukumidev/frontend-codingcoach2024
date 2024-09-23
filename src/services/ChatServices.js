import { host } from './config';

export const sendChatMessage = async (message, isStart, questionId = null, userData = null) => {
  const url = `${host}/interview`;
  
    // Obtener el token de localStorage
    const token = localStorage.getItem('token');
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  
    // Asegurémonos de que el `body` esté correctamente formateado
    const body = isStart
      ? {
          language: userData.language,
          experience: userData.experience,
          technologies: userData.technologies
        }
      : {
          answer: message,  // Aquí usamos directamente el `message` que es el input del usuario
          question_id: questionId
        };
  
    console.log('Datos enviados:', body);  // Verificar que el body se esté enviando correctamente
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),  // Convertir el body a JSON
        mode: 'cors'
      });
  
      if (!response.ok) {
        throw new Error('Error in request');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      return { response: 'Error sending message' };
    }
  };