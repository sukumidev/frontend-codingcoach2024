import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { host } from '../../services/config';
import { useUser } from '../../contexts/UserContext'; // Asegúrate de tener el contexto de usuario

const UserProgress = () => {
  const [preferredLanguages, setPreferredLanguages] = useState([]);
  const { user } = useUser(); // Obtener el usuario loggeado

  // Obtener lenguajes preferidos del usuario
  useEffect(() => {
    if (user) {
      axios.get(`${host}/user/${user.id}/languages`) // Usamos la nueva ruta que creamos
        .then(response => {
          setPreferredLanguages(response.data);
        })
        .catch(error => {
          console.error("Error al obtener los lenguajes preferidos:", error);
        });
    }
  }, [user]);

  return (
    <div className="preferred-languages">
      <h3>Lenguajes preferidos</h3>
      <ul>
        {preferredLanguages.length > 0 ? (
          preferredLanguages.map((lang, index) => (
            <li key={index}>
              {lang.language}: {lang.count} veces ({lang.percentage.toFixed(2)}%)
            </li>
          ))
        ) : (
          <li>No hay lenguajes preferidos disponibles</li>
        )}
      </ul>
    </div>
  );
};

export default UserProgress;
