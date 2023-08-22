import React from 'react';
import {Box, Typography, Paper} from '@mui/material';
import Layout from '../../layout/Layout';
import zooAPI from '../../src/assets/zoo-background.jpg';
import besucher from '../assets/Besucher.jpg';
import tierpfleger from '../assets/Tierpfleger.jpg';
import kassierer from '../assets/Kassierer.jpg';
import {Link} from 'react-router-dom';

const HomePage = () => {
    return (
        <Layout>
            <Box sx={{mt: 4, mb: 2, textAlign: 'center'}}>
                <Typography variant="h2">Willkommen im Zoo!</Typography>
                <Typography variant="h5">Entdecken Sie unsere Tiere und Angebote</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    minHeight: '240px',
                    flexWrap: 'wrap',
                }}
            >
                <Link to="/Zoobesucher" style={{textDecoration: 'none'}}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 2,
                            borderRadius: '16px',
                            width: '200px',
                            height: '200px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img src={besucher} alt="Besucher"
                             style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px'}}/>
                    </Paper>
                </Link>
                <Link to="/Tierpfleger" style={{textDecoration: 'none'}}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 2,
                            borderRadius: '16px',
                            width: '200px',
                            height: '200px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img src={tierpfleger} alt="Tierpfleger"
                             style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px'}}/>
                    </Paper>
                </Link>
                <Link to="/Kassierer" style={{textDecoration: 'none'}}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 2,
                            borderRadius: '16px',
                            width: '200px',
                            height: '200px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img src={kassierer} alt="Kassierer"
                             style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px'}}/>
                    </Paper>
                </Link>
            </Box>
        </Layout>
    );
};

export default HomePage;