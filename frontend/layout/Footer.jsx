import React from 'react';
import {Box, Typography, useTheme} from '@mui/material';

const Footer = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                padding: '1rem',
                textAlign: 'center',
                boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Typography>© 2023 ZooAPI</Typography>
        </Box>
    );
};

export default Footer;