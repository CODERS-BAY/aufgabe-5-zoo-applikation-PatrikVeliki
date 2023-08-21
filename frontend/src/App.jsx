import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Tiere from './pages/Tiere'; // Neue Seite für Tiere
import Tickets from './pages/Tickets'; // Neue Seite für Tickets
import Tierpfleger from './pages/Tierpfleger.jsx'; // Neue Seite für Mitarbeiter
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                    <Route path='/tiere' element={<Tiere/>}/> {/* Neue Route für Tiere */}
                    <Route path='/tickets' element={<Tickets/>}/> {/* Neue Route für Tickets */}
                    <Route path='/mitarbeiter' element={<Tierpfleger/>}/> {/* Neue Route für Mitarbeiter */}
                </Routes>
            </BrowserRouter>
            <Footer/>
        </>
    );
}

export default App;
