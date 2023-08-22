import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from '@mui/material';
import Header from '../layout/Header';
import HomePage from './pages/HomePage';
import KassiererPage from './pages/KassiererPage';
import TierpflegerPage from './pages/TierpflegerPage';
import ZoobesucherPage from './pages/ZoobesucherPage';
import {useState} from "react";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <Router>
            <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
            <Container>
                <Routes>
                    <Route path="/" element={<HomePage/>} exact/>
                    <Route path="/Zoobesucher" element={<ZoobesucherPage/>}/>
                    <Route path="/Tierpfleger" element={<TierpflegerPage/>}/>
                    <Route path="/Kassierer" element={<KassiererPage/>}/>
                </Routes>
            </Container>
        </Router>
    );
}

export default App;