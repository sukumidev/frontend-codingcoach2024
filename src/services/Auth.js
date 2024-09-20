import axios from 'axios';
import { toast } from 'react-toastify';

const host = 'https://api-codingcoach-kjuzq4ogha-uc.a.run.app';

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
        return response.data; // Devuelve los datos al componente que lo llama
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