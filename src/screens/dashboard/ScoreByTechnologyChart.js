import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { host } from '../../services/config';

const ScoreByTechnologyChart = () => {
  const [technologyScores, setTechnologyScores] = useState([]);
  const { user } = useUser();

  // Colores para cada tecnología
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c'];

  useEffect(() => {
    if (user) {
      axios.get(`${host}/user/${user.id}/technology-scores`)
        .then(response => {
          setTechnologyScores(response.data);
        })
        .catch(error => {
          console.error("Error al obtener los puntajes por tecnología:", error);
        });
    }
  }, [user]);

  return (
    <div className="technology-score-chart">
      <h3>Puntaje por tecnología</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={technologyScores}>
          <XAxis dataKey="technology" />
          <YAxis domain={[0, 'auto']} />  {/* Ajustar el rango del eje Y */}
          <Tooltip />
          <Legend />
          <Bar dataKey="average_score" fill="#8884d8">
            {technologyScores.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreByTechnologyChart;
