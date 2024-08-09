import React from 'react';
import Login from './Login';
import Register from './Register';

function AuthPage() {
    const handleLoginSuccess = (userData) => {
        console.log("Usuario logueado:", userData);
    };

    const handleRegisterSuccess = (userData) => {
        console.log("Usuario registrado:", userData);
    };

    return (
        <div>
            <h1>Bienvenido a nuestra aplicación</h1>
            <Login onLoginSuccess={handleLoginSuccess} />
            <Register onRegisterSuccess={handleRegisterSuccess} />
        </div>
    );
}

export default AuthPage;
