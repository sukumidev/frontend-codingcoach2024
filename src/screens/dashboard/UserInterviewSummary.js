import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Cambiar useHistory por useNavigate
import { useUser } from '../../contexts/UserContext';
import { host } from '../../services/config';

const UserInterviewSummary = () => {
  const [interviewSummaries, setInterviewSummaries] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();  // Cambiar a useNavigate

  useEffect(() => {
    if (user) {
      axios.get(`${host}/user/${user.id}/interview-summary`)
        .then(response => {
          setInterviewSummaries(response.data);
        })
        .catch(error => {
          console.error("Error al obtener las entrevistas:", error);
        });
    }
  }, [user]);

  // Función para redirigir a la página de detalles de una entrevista
  const handleViewDetails = (interview_id) => {
    navigate(`/interview/${interview_id}`);  // Cambiar history.push por navigate
  };

  return (
    <div className="user-interview-summary">
      <h3>Mis Entrevistas</h3>
      <ul>
        {interviewSummaries.length > 0 ? (
          interviewSummaries.map((interview, index) => (
            <li key={index} className="interview-summary-item">
              <div className="interview-info">
                <p><strong>Fecha:</strong> {new Date(interview.timestamp).toLocaleString()}</p>
                <p><strong>Tecnologías:</strong> {interview.technologies.join(', ')}</p>
                <p><strong>Puntaje Total:</strong> {interview.total_score}</p>
              </div>
              <div className="interview-actions">
                <button onClick={() => handleViewDetails(interview.interview_id)}>Ver detalles</button>
              </div>
            </li>
          ))
        ) : (
          <p>No hay entrevistas disponibles</p>
        )}
      </ul>
    </div>
  );
};

export default UserInterviewSummary;
