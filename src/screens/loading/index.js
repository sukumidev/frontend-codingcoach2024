import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'; 

// Styles
import './styles.sass';

const Loading = () => {
  const navigate = useNavigate();
  const { user } = useUser(); 
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    const fadeOutTimer = setTimeout(() => {
      setFadeIn(false);
      setFadeOut(true);
    }, 9500);

    const navigateTimer = setTimeout(() => {
      console.log(user)
      if (user) {
        navigate('/dashboard'); 
      } else {
        navigate('/login'); 
      }
    }, 10000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate, user]);

  return (
    <div className={`LoadingScreen ${fadeIn ? 'fade-in' : ''} ${fadeOut ? 'fade-out' : ''}`}>
      <h1>Coding Coach</h1>
    </div>
  );
};

export default Loading;
