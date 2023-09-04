import React, {useState, useEffect} from 'react';
import {Container, Grid, Typography, Button, Box, Paper} from '@mui/material';
import TicketForm from '../../src/components/TicketForm';
import TicketTable from '../../src/components/TicketTable';
import {fetchTickets, buyTicket, fetchTicketsByDate} from '../../api.js';
import Layout from '../../layout/Layout';
import zooEingang from '../../src/assets/eingang-zoo.jpg';

function KassiererPage() {
    const [tickets, setTickets] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 16));
    const [selectedTicketType, setSelectedTicketType] = useState('');
    const ticketPrices = {
        '1': 5.0,
        '2': 10.0,
        '3': 7,
    };

    useEffect(() => {
        fetchTickets().then((data) => setTickets(data));
    }, []);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTicketTypeChange = (event) => {
        setSelectedTicketType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        buyTicket(selectedTicketType, ticketPrices, selectedDate).then((success) => {
            if (success) {
                fetchTickets().then((data) => setTickets(data));
            }
        });
    };

    const totalTickets = tickets.length;
    const totalPrice = Array.isArray(tickets)
        ? tickets.reduce((sum, ticket) => sum + ticket.preis, 0)
        : 0;

    const formattedDate = selectedDate.slice(0, 10); // YYYY-MM-DD

    const handleFetchTicketsByDate = () => {
        fetchTicketsByDate(formattedDate)
            .then((data) => setTickets(data))
            .catch((error) => console.error('Fehler beim Abrufen der Tickets:', error));
    };

    return (
        <Layout>
            <Box sx={{mt: 4, mb: 2, textAlign: 'center'}}>
                <Typography variant="h2">Kassierer</Typography>
                <Typography variant="h5">Verwalten Sie Ticketverkäufe und Einnahmen</Typography>
            </Box>
            <Paper
                elevation={3}
                sx={{
                    padding: 20,
                    marginBottom: 20,
                    backgroundColor: '#F5F5F5',
                    position: 'relative',
                    borderRadius: '16px',
                }}
            >
                <img
                    src={zooEingang}
                    alt="Zoo"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '16px',
                    }}
                />
            </Paper>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TicketForm
                        selectedDate={selectedDate}
                        handleDateChange={handleDateChange}
                        selectedTicketType={selectedTicketType}
                        handleTicketTypeChange={handleTicketTypeChange}
                        handleSubmit={handleSubmit}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{marginTop: 2}}
                        onClick={handleFetchTicketsByDate}
                    >
                        Tickets nach Datum abrufen
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TicketTable tickets={tickets}/>
                </Grid>
            </Grid>
            <Box sx={{mt: 4, textAlign: 'center'}}>
                <Typography variant="h6" gutterBottom>
                    Gesamtanzahl der verkauften Tickets: {totalTickets}
                </Typography>
                <Typography variant="h6">
                    Gesamtsumme: {totalPrice.toFixed(2)} €
                </Typography>
            </Box>
        </Layout>
    );
}

export default KassiererPage;