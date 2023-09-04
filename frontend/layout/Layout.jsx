import React, {useState} from 'react';
import {Container, Box, Typography, useTheme, Switch, IconButton} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Layout = ({children}) => {
    const theme = useTheme();
    const [darkMode, setDarkMode] = useState(false);

    const handleDarkModeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: darkMode ? '#30372e' : '#f4f1e8',
                color: darkMode ? '#f4f1e8' : '#2e2e2e',
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                <IconButton onClick={handleDarkModeChange}>
                    {darkMode ? <Brightness7Icon/> : <Brightness4Icon/>}
                </IconButton>
            </Box>
            {children}
        </Container>
    );
};

export default Layout;