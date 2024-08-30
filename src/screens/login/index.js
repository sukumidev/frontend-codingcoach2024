import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../contexts/UserContext';

// Styles
import './styles.sass';

// FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; 

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://api-codingcoach-kjuzq4ogha-uc.a.run.app/login', { email, password });
      console.log('Login Success:', response.data);
      setUser(response.data.user); // Asegúrate de que el backend retorne la información del usuario
      toast.success('Inicio de sesión exitoso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      toast.error('Error en el inicio de sesión: ' + (error.response ? error.response.data.message : error.message), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
