import {useState, useEffect} from 'react';
import {buyTicket, fetchTickets, fetchTicketsByDate} from '../../api/api'; // Pfad zu api.js anpassen

function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [ticketPrice, setTicketPrice] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        async function fetchAllTickets() {
            try {
                const data = await fetchTickets();
                setTickets(data);
            } catch (error) {
                console.error("Fehler beim Abrufen aller Tickets:", error);
            }
        }

        fetchAllTickets();
    }, []);

    const handleBuyTicket = async () => {
        try {
            const ticketData = {preis: ticketPrice, verkaufsdatum: new Date().toISOString()};
            await buyTicket(ticketData);
            // Nach dem Kauf das Ticket zur Liste hinzufügen
            setTickets(prevTickets => [...prevTickets, ticketData]);
        } catch (error) {
            console.error("Fehler beim Kaufen eines Tickets:", error);
        }
    };

    const handleDateFilter = async () => {
        try {
            const data = await fetchTicketsByDate(selectedDate);
            setTickets(data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Tickets nach Datum:", error);
        }
    };

    return (
        <div>
            <h1>Ticketverkauf</h1>

            {/* Ticketkauf Formular */}
            <input
                type="number"
                value={ticketPrice}
                onChange={e => setTicketPrice(e.target.value)}
                placeholder="Ticketpreis..."
            />
            <button onClick={handleBuyTicket}>Ticket kaufen</button>

            {/* Tickets nach Datum filtern */}
            <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
            />
            <button onClick={handleDateFilter}>Nach Datum filtern</button>

            <ul>
                {tickets.map((ticket, index) => (
                    <li key={index}>
                        Preis: {ticket.preis} - Verkaufsdatum: {ticket.verkaufsdatum}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tickets;