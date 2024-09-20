import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { login as loginService } from '../../services/Auth';

// Styles
import './styles.sass';

// FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data = await loginService(email, password);
      setUser(data.user); // Establece el usuario en el contexto
      navigate('/dashboard'); // Navega al dashboard
    } catch (error) {
      console.error('Login Error:', error.message);
      // Los errores ya se manejan con toast en el servicio, así que no es necesario duplicar el manejo aquí.
    }
  };

  return (
    <div className='LoginScreen'>
      <div className='Left'>
        <form onSubmit={handleLogin} className='Form'>
          <h2>Login</h2>
          <p>Ingresa para acceder a las funciones de Coding Coach</p>
          <div className='Input'>
            <label><FontAwesomeIcon icon={faUser} /></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
            />
          </div>
          <div className='Input'>
            <label><FontAwesomeIcon icon={faLock} /></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Contraseña'
            />
          </div>
          <button className='Button' type="submit">Ingresar</button>
        </form>
        <p>
          No tienes una cuenta? <Link to="/register">Crear una cuenta</Link>
        </p>
      </div>
      <div className='Right'>
        <h1>Coding Coach</h1>
      </div>
    </div>
  );
}

export default Login;
