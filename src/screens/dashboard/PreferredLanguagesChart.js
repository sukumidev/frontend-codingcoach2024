import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { host } from '../../services/config';

const PreferredLanguagesChart = () => {
  const [preferredLanguages, setPreferredLanguages] = useState([]);
  const { user } = useUser();

  // Colores para cada lenguaje
  const COLORS = ['#F1E05A', '#563D7C', '#E34C26', '#1572B6', '#CC6699'];

  useEffect(() => {
    if (user) {
      axios.get(`${host}/user/${user.id}/languages`)
        .then(response => {
          setPreferredLanguages(response.data);
        })
        .catch(error => {
          console.error("Error al obtener los lenguajes preferidos:", error);
        });
    }
  }, [user]);

  return (
    <div className="preferred-languages-chart">
      <h4>Lenguajes preferidos</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={preferredLanguages}
          layout="vertical"
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <XAxis type="number" domain={[0, 100]} hide /> {/* Eje de porcentaje */}
          <YAxis type="category" dataKey="language" width={100} /> {/* Nombres de lenguajes */}
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
          <Bar dataKey="percentage" fill="#8884d8">
            {preferredLanguages.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PreferredLanguagesChart;
