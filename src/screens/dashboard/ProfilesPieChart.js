import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { host } from '../../services/config';

const ProfilesPieChart = () => {
  const [profilesData, setProfilesData] = useState([]);
  const { user } = useUser();

  // Colores para cada perfil
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    if (user) {
      axios.get(`${host}/user/${user.id}/profiles-pie`)
        .then(response => {
          setProfilesData(response.data);
        })
        .catch(error => {
          console.error("Error al obtener los perfiles:", error);
        });
    }
  }, [user]);

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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfilesPieChart;