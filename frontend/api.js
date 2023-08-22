const API_BASE_URL = 'http://localhost:5207/api';

const handleResponse = async (response) => {
    if (response.ok) {
        return await response.json();
    } else {
        const message = await response.text();
        throw new Error(message || `API request failed with status ${response.status}`);
    }
};

export const fetchTickets = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/Kassierer/tickets`);
        return handleResponse(response);
    } catch (error) {
        console.error('Fehler beim Abrufen der Tickets:', error);
        return [];
    }
};

export const buyTicket = async (ticketType, ticketPrices, selectedDate) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Kassierer/buy`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: parseInt(ticketType, 10),
                preis: ticketPrices[ticketType],
                verkaufsdatum: selectedDate,
            }),
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Fehler beim Kauf des Tickets:', error);
        return false;
    }
};

export const fetchTicketsByDate = async (date) => {
    const url = `${API_BASE_URL}/Kassierer/tickets/date/${date}`;
    console.log('Fetching tickets by date URL:', url); // Zum Debuggen

    try {
        const response = await fetch(url);
        return handleResponse(response);
    } catch (error) {
        console.error('Fehler beim Abrufen der Tickets nach Datum:', error);
        return [];
    }
};

// Fetch assigned animals by caretaker ID
export const fetchAssignedAnimals = async (tierpflegerId) => {
    const response = await fetch(`${API_BASE_URL}/tierpfleger/${tierpflegerId}/tiere`);
    return handleResponse(response);
};

// Update animal details
export const updateAnimal = async (animalId, updatedData) => {
    const response = await fetch(`${API_BASE_URL}/tierpfleger/tiere/${animalId}/${updatedData.gehegeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });
    return handleResponse(response);
};
