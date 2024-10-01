import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { host } from '../../services/config';  // Importación del host

const ScoreProgressChart = () => {
  const [scoreProgress, setScoreProgress] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const { user } = useUser();

  // Obtener el progreso de puntaje del usuario
  useEffect(() => {
    if (user) {
      axios.get(`${host}/user/${user.id}/scores`)  // Uso de la variable host
        .then(response => {
          const scores = response.data.scores;

          // Agregar un índice para cada puntaje
          const formattedScores = scores.map((score, index) => ({
            index: index + 1, // Comenzamos el índice desde 1
            score: score
          }));

          setScoreProgress(formattedScores);
          setAverageScore(response.data.average_score);
        })
        .catch(error => {
          console.error("Error al obtener el progreso de puntaje:", error);
        });
    }
  }, [user]);

  return (
    <div className="score-progress-chart">
      <h4>Progreso de puntaje</h4>
      <p>Puntaje promedio: {averageScore.toFixed(2)}</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={scoreProgress}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" label="Intento" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreProgressChart;
