import axios from 'axios';
import { host } from './config';

export const sendChatMessage = async (message) => {
    try {
        const response = await axios.post(`${host}/chat`, { message });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw new Error(error.response?.data?.message || error.message);
    }
};
