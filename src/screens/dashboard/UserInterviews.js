import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import { host } from '../../services/config';

const UserInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const { user } = useUser(); // Obtener el usuario loggeado

  useEffect(() => {
    if (user) {
      axios.get(`${host}/user/interviews?user_id=${user.id}`)
        .then(response => {
          if (Array.isArray(response.data)) {
            setInterviews(response.data);  // Asegurarse de que la respuesta es un array
          } else {
            console.error("La respuesta no es un array:", response.data);
          }
        })
        .catch(error => {
          console.error("Error al obtener las entrevistas:", error);
        });
    }
  }, [user]);

  return (
    <div className="user-interviews">
      <h3>Mis entrevistas</h3>
      <ul>
        {Array.isArray(interviews) && interviews.length > 0 ? (
          interviews.map((interview, index) => (
            <li key={index} className="interview-item">
              <p><strong>Fecha:</strong> {new Date(interview.timestamp).toLocaleDateString()}</p>
              <p><strong>Nivel:</strong> {interview.level || "No especificado"}</p>
              <p><strong>Puntaje:</strong> {interview.score}</p>
              <p><strong>Lenguaje:</strong> {interview.language}</p>
            </li>
          ))
        ) : (
          <p>No hay entrevistas disponibles</p>
        )}
      </ul>
    </div>
  );
};

export default UserInterviews;
