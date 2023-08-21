import {useState, useEffect} from 'react';
import {getAllTiere, getTierByGattung} from '../../api/api'; // Pfad zu api.js anpassen

function Tiere() {
    const [tiere, setTiere] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchAllTiere() {
            try {
                const data = await getAllTiere();
                setTiere(data);
            } catch (error) {
                console.error("Fehler beim Abrufen aller Tiere:", error);
            }
        }

        fetchAllTiere();
    }, []);

    const handleSearch = async () => {
        try {
            const data = await getTierByGattung(searchTerm);
            setTiere(data);
        } catch (error) {
            console.error("Fehler bei der Suche nach Tieren:", error);
        }
    };

    return (
        <div>
            <h1>Tiere im Zoo</h1>

            {/* Suche nach Tiergattung */}
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Suche nach Tiergattung..."
            />
            <button onClick={handleSearch}>Suchen</button>

            <ul>
                {tiere.map(tier => (
                    <li key={tier.id}>
                        {tier.gattung} - {tier.nahrung}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tiere;