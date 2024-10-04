import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { host } from '../../services/config';

const ProfilesPieChart = () => {
  const [profilesData, setProfilesData] = useState([]);
  const { user } = useUser();

  // Colores para cada perfil (12 colores diferentes)
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
    '#9966FF', '#FF9F40', '#C0C0C0', '#FFD700'
  ];

  useEffect(() => {
    if (user) {
      axios.get(`${host}/user/${user.id}/profiles-pie`)
        .then(response => {
          // Ordenar los datos alfabéticamente por nombre de perfil
          const sortedData = response.data.sort((a, b) => b.percentage - a.percentage);
          setProfilesData(sortedData);
        })
        .catch(error => {
          console.error("Error al obtener los perfiles:", error);
        });
    }
  }, [user]);

  const renderTooltipContent = ({ payload }) => {
    if (payload && payload.length) {
      const { name, value } = payload[0];
      return `${name} : ${value.toFixed(2)}%`;
    }
    return null;
  };

  return (
    <div className="profiles-pie-chart">
      <h3>Perfiles</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={profilesData}
            dataKey="percentage"
            nameKey="profile"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
          >
            {profilesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index] || '#000000'} /> 
            ))}
          </Pie>
          <Tooltip
            content={renderTooltipContent}
            wrapperStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfilesPieChart;