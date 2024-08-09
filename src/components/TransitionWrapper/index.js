// src/components/TransitionWrapper.js
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import './styles.sass'; // Asegúrate de tener los estilos para las animaciones

const TransitionWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={500}
        classNames="fade"
      >
        <div className="fade-wrapper">
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionWrapper;
