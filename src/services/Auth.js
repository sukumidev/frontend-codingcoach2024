import axios from 'axios';
import { toast } from 'react-toastify';
import { host } from './config';

export const isUserLoggedIn = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;  
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${host}/login`, { email, password });
        toast.success('Inicio de sesión exitoso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data; 
    } catch (error) {
        toast.error('Error en el inicio de sesión: ' + (error.response?.data?.message || error.message), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        throw error.response ? error.response.data : new Error(error.message);
    }
};

export const logout = async () => {
    try {
        await axios.post(`${host}/logout`);
        toast.success('Cierre de sesión exitoso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        localStorage.removeItem('user');
        return;
    } catch (error) {
        toast.error('Error al cerrar sesión: ' + (error.response?.data?.message || error.message), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        throw error;
    }
};

export const register = async (name, email, password, age) => {
    try {
        const response = await axios.post(`${host}/create_user`, { name, email, password, age: parseInt(age, 10) });
        toast.success('Registro exitoso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        toast.error('Error en el registro: ' + (error.response?.data?.message || error.message), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        throw error.response ? error.response.data : new Error(error.message);
    }
};
