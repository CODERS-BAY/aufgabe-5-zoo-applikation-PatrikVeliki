import axios from 'axios';

const BASE_URL = 'http://localhost:5207'; // Replace this with your backend URL

// Zoobesucher Functions
export const getAllTiere = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/Zoobesucher/tiere`);
        return response.data;
    } catch (error) {
        console.error('Fehler beim Abrufen aller Tiere:', error);
        throw error;
    }
};

export const getTierByGattung = async (gattung) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/Zoobesucher/tiere/${gattung}`);
        return response.data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Tiere nach Gattung:', error);
        throw error;
    }
};

// Kassierer Functions
export const buyTicket = async (ticketData) => {
    try {

        const response = await axios.post(`${BASE_URL}/api/Kassierer/buy`, ticketData);
        return response.data;
    } catch (error) {
        console.error('Fehler beim Kaufen eines Tickets:', error);
        throw error;
    }
};

export const fetchTickets = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/Kassierer/gettickets`);
        return response.data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Tickets:', error);
        throw error;
    }

};

export const fetchTicketsByDate = async (date) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/Kassierer/tickets/date/${date}`);
        return response.data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Tickets nach Datum:', error);
        throw error;
    }
};

// Tierpfleger Functions
export const getTiereByPflegerIdAsync = async (pflegerId) => {
    const response = await axios.get(`${BASE_URL}/api/Tierpfleger/${pflegerId}/tiere`);
    return response.data;
};

export const updateTierAsync = async (id, column, data) => {
    const response = await axios.put(`${BASE_URL}/api/Tierpfleger/tiere/${id}/${column}`, data);
    return response.data;
};