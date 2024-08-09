import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import './styles.sass';

const LoadingScreen = () => {
    const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setFadeIn(true); // Inicia el fade-in al montar el componente

    const fadeOutTimer = setTimeout(() => {
      setFadeIn(false); // Inicia el fade-out
      setFadeOut(true); // Aplica clase de fade-out
    }, 9500); // Espera 4.5 segundos antes de iniciar el fade-out

    const navigateTimer = setTimeout(() => {
      navigate('/login'); // Navega después de la animación fade-out
    }, 10000); // Navega después de 5 segundos

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);


  return (
    <div className={`LoadingScreen`}>
        <h1>Coding Coach</h1>
    </div>
  );
};

export default LoadingScreen;
