import React from 'react';
import {TextField, Button, Box} from '@mui/material';

function TicketForm({selectedDate, handleDateChange, selectedTicketType, handleTicketTypeChange, handleSubmit}) {
    const isFormValid = selectedDate && selectedTicketType;

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap'}}>
                <TextField
                    label="Datum"
                    type="datetime-local"
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!selectedDate}
                    helperText={!selectedDate && 'Bitte wählen Sie ein Datum'}
                />
                <TextField
                    label="Tickettyp"
                    select
                    value={selectedTicketType}
                    onChange={handleTicketTypeChange}
                    SelectProps={{
                        native: true,
                    }}
                    error={!selectedTicketType}
                    helperText={!selectedTicketType && 'Bitte wählen Sie einen Tickettyp'}
                >
                    <option value="">Wählen Sie einen Tickettyp</option>
                    <option value="1">Kinder</option>
                    <option value="2">Erwachsener</option>
                    <option value="3">Senioren</option>
                </TextField>
                <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
                    Ticket hinzufügen
                </Button>
            </Box>
        </form>
    );
}

export default TicketForm;
