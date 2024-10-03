import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { host } from '../../services/config';
import './styles.sass'

const InterviewDetails = () => {
  const { id } = useParams();  // Obtenemos el ID de la entrevista desde la URL
  const [interviewDetails, setInterviewDetails] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      axios.get(`${host}/user/${user.id}/interview/${id}`)
        .then(response => {
          console.log('Datos crudos recibidos del backend:', response.data);

          // Verificar si los datos son un string y convertirlos a JSON si es necesario
          let data = response.data;
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);  // Intentamos convertir el string en un objeto JSON
              console.log('Datos convertidos a objeto:', data);
            } catch (e) {
              console.error('Error al parsear JSON:', e);
            }
          }

          // Asegurarse de que los datos sean un objeto antes de continuar
          if (typeof data === 'object') {
            setInterviewDetails(data);  // Guardar los detalles de la entrevista
          } else {
            console.error('Los datos no son un objeto después de la conversión:', data);
          }
        })
        .catch(error => {
          console.error("Error al obtener los detalles de la entrevista:", error);
        });
    }
  }, [user, id]);

  // Comprobación adicional para asegurarnos de que `interviewDetails` es un objeto
  if (typeof interviewDetails !== 'object' || interviewDetails === null) {
    console.error('Los detalles de la entrevista no son un objeto válido:', interviewDetails);
    return <p>Error: Los datos de la entrevista no son válidos.</p>;
  }

  // Comprobación para verificar si hay preguntas
  const hasValidQuestions = Array.isArray(interviewDetails.questions) && interviewDetails.questions.length > 0;

  return (
    <div className="interview-details">
      <h2>Detalles de la Entrevista</h2>
      {interviewDetails ? (
        <div>
          {/* Mostrar los datos correctamente */}
          <p>
          <span className="icon">
                <i className="fas fa-calendar-alt"></i>
            </span>
            <strong>Fecha:</strong> {interviewDetails.timestamp ? new Date(interviewDetails.timestamp).toLocaleString() : "Fecha no disponible"}</p>
            <div>
            <strong  className="technologies">Tecnologías: </strong>
            {interviewDetails.technologies && interviewDetails.technologies.length > 0 ? (
                interviewDetails.technologies
                .filter((tech, index, self) => self.indexOf(tech) === index) // Eliminar duplicados
                .join(', ')  // Unir en una sola línea separada por comas
            ) : (
                "No disponible"
            )}
            </div>

          <p><strong>Puntaje Total:</strong> {interviewDetails.score !== undefined ? interviewDetails.score : "No disponible"}</p>

          <p><strong>Preguntas:</strong></p>
          <ul className="questions">
            {hasValidQuestions ? (
              interviewDetails.questions.map((question, index) => (
                <li key={index}>
                <p><strong>Pregunta {index + 1}:</strong> {question.Question || "No disponible"}</p>
                <p><strong>Respuesta esperada:</strong> {question.Answer || "No disponible"}</p>

                {/* Mostrar la respuesta del usuario, omitiendo la primera */}
                <p><strong>Tu respuesta:</strong> {interviewDetails.answers && interviewDetails.answers[index + 1] !== undefined ? interviewDetails.answers[index + 1] : "No disponible"}</p>

                {/* Mostrar el puntaje obtenido en esa pregunta */}
                <p><strong>Puntaje:</strong> {interviewDetails.question_scores && interviewDetails.question_scores[index] !== undefined ? interviewDetails.question_scores[index] : "No disponible"}</p>

                {/* Mostrar el feedback recibido, omitiendo el primer feedback */}
                <p><strong>Feedback:</strong> {interviewDetails.feedback && interviewDetails.feedback[index + 1] !== undefined ? interviewDetails.feedback[index + 1] : "No disponible"}</p>
                </li>
              ))
            ) : (
              <p>No hay preguntas disponibles para esta entrevista.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Cargando los detalles de la entrevista...</p>
      )}
    </div>
  );
};

export default InterviewDetails;