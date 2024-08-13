import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

// Styles
import './styles.sass';

// FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, fa0 } from '@fortawesome/free-solid-svg-icons'; 

function Register({ onRegisterSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
      age: parseInt(age, 10)
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/create_user', userData);
      console.log('Register Success:', response.data);
      setUser(response.data);
      navigate('/dashboard');
      toast.success('Registro exitoso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Register Error:', error.response ? error.response.data : error.message);
      toast.error('Error en el registro: ' + (error.response ? error.response.data.message : error.message), {
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
    <div className='RegisterScreen'>
      <form onSubmit={handleRegister}>
        <h2>Registrarse</h2>
        <p>Registrate para acceder a los servicios de Coding Coach</p>
        <div className='Input'>
          <label><FontAwesomeIcon icon={faUser} /></label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Nombre'
            required
          />
        </div>
        <div className='Input'> 
          <label><FontAwesomeIcon icon={faEnvelope} /></label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </div>
        <div className='Input'>
          <label><FontAwesomeIcon icon={faLock} /></label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Contraseña'
            required
          />
        </div>
        <div className='Input'>
          <label><FontAwesomeIcon icon={fa0} /></label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder='Edad'
            required
          />
        </div>
        <button type="submit">Continuar</button>
      </form>
      <p>Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
    </div>
  );
}

export default Register;
