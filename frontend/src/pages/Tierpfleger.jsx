import {useState, useEffect} from 'react';
import {getTiereByPflegerIdAsync} from '../../api/api';

function Tierpfleger() {
    const [tiere, setTiere] = useState([]);
    const [selectedPfleger, setSelectedPfleger] = useState('');

    async function fetchTiereByPflegerId(pflegerId) {
        try {
            const data = await getTiereByPflegerIdAsync(pflegerId);
            setTiere(data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Tiere für den Pfleger:", error);
        }
    }

    useEffect(() => {
        if (selectedPfleger) {
            fetchTiereByPflegerId(selectedPfleger);
        }
    }, [selectedPfleger]);

    return (
        <div className="tierpfleger-dashboard">
            <h1>Tierpfleger Dashboard</h1>

            <div className="pfleger-selection">
                <label htmlFor="pflegerSelect">Wählen Sie einen Tierpfleger:</label>
                <select
                    id="pflegerSelect"
                    value={selectedPfleger}
                    onChange={e => setSelectedPfleger(e.target.value)}
                >
                    <option value="">-- Tierpfleger auswählen --</option>
                    <option value="1">Hans</option>
                    <option value="2">Maria</option>
                </select>
            </div>

            <div className="tiere-list">
                {tiere.map(tier => (
                    <div key={tier.id} className="tier-item">
                        <h2>{tier.gattung}</h2>
                        <p>Nahrung: {tier.nahrung}</p>
                        <p>Gehege ID: {tier.gehege_id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tierpfleger;