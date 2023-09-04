import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function ServiceList({ services = [] }) {
    return (
        <List sx={{ width: '80%', maxWidth: 720, bgcolor: 'background.paper', textAlign: 'left', mb: 4 }}>
            {services.map((service) => (
                <ListItem key={service.path} component={Link} to={service.path}>
                    <ListItemText primary={service.label} />
                </ListItem>
            ))}
        </List>
    );
}

export default ServiceList;
