import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

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
    <div>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link></p>
    </div>
  );
}

export default Register;
