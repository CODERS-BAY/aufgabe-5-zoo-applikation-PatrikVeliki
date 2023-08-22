import React, {useState} from 'react';
import {Box, Typography, useTheme, Switch} from '@mui/material';
import {Link} from 'react-router-dom';



const Header = ({ darkMode, setDarkMode }) => {
    const theme = useTheme();

    const handleDarkModeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Box
            sx={{
                backgroundColor: darkMode ? '#30372e' : '#f4f1e8',
                color: darkMode ? '#f4f1e8' : '#2e2e2e',
                padding: '1rem',
                textAlign: 'center',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
                width: '100%',
                position: 'fixed',
                top: 0,
                zIndex: 1000,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Zoo-Logo
                </Link>
            </Typography>
            <Switch checked={darkMode} onChange={handleDarkModeChange} />
        </Box>
    );
};

export default Header;
