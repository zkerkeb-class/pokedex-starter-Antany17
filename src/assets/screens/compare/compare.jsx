/**
 * Compare.jsx - Page de comparaison de Pokémon
 * Permet de comparer les statistiques de deux Pokémon sélectionnés
 */

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './compare.css';

const Compare = () => {
    // Récupération des Pokémon à comparer depuis l'état de navigation
    const location = useLocation();
    const navigate = useNavigate();
    const { pokemon1, pokemon2 } = location.state || {};

    // Vérification de la présence des Pokémon à comparer
    if (!pokemon1 || !pokemon2) {
        return (
            <div className="compare-container">
                <h1>Erreur</h1>
                <p>Les Pokémon à comparer n'ont pas été trouvés</p>
                <button onClick={() => navigate('/home')}>Retour à l'accueil</button>
            </div>
        );
    }

    /**
     * Retourne le style pour mettre en évidence la meilleure statistique
     * @param {number} stat1 - Statistique du premier Pokémon
     * @param {number} stat2 - Statistique du deuxième Pokémon
     * @returns {Object} - Style CSS
     */
    const getStatStyle = (stat1, stat2) => {
        return stat1 > stat2 ? { color: '#4CAF50' } : {};
    };

    /**
     * Retourne la classe CSS correspondant au type du Pokémon
     * @param {string} type - Type du Pokémon
     * @returns {string} - Classe CSS
     */
    const getTypeClass = (type) => {
        return `type-name type-${type.toLowerCase()}`;
    };

    return (
        <div className="compare-container">
            <h1>Comparaison de Pokémon</h1>
            <div className="compare-pokemons">
                {/* Premier Pokémon */}
                <div className="pokemon-card">
                    <h2>{pokemon1.name.french}</h2>
                    <img src={pokemon1.image} alt={pokemon1.name.french} />
                    <div className="pokemon-types">
                        {pokemon1.type?.map((type) => (
                            <span key={type} className={getTypeClass(type)}>{type}</span>
                        ))}
                    </div>
                    <div className="pokemon-stats">
                        <p style={getStatStyle(pokemon1.base.HP, pokemon2.base.HP)}>HP: {pokemon1.base.HP}</p>
                        <p style={getStatStyle(pokemon1.base.Attack, pokemon2.base.Attack)}>Attack: {pokemon1.base.Attack}</p>
                        <p style={getStatStyle(pokemon1.base.Defense, pokemon2.base.Defense)}>Defense: {pokemon1.base.Defense}</p>
                        <p style={getStatStyle(pokemon1.base.Speed, pokemon2.base.Speed)}>Speed: {pokemon1.base.Speed}</p>
                        <p style={getStatStyle(pokemon1.base["Sp. Attack"], pokemon2.base["Sp. Attack"])}>Sp. Attack: {pokemon1.base["Sp. Attack"]}</p>
                        <p style={getStatStyle(pokemon1.base["Sp. Defense"], pokemon2.base["Sp. Defense"])}>Sp. Defense: {pokemon1.base["Sp. Defense"]}</p>
                    </div>
                    <div className="action-buttons">
                        <button className="action-button shiny-button" onClick={() => navigate(`/pokemon/${pokemon1.id}/shiny`)}>
                            Voir la version Shiny
                        </button>
                        <button className="action-button" onClick={() => navigate(`/pokemon/${pokemon1.id}`)}>
                            Voir pokemon en détail
                        </button>
                    </div>
                </div>

                {/* Séparateur VS */}
                <div className="vs">VS</div>

                {/* Deuxième Pokémon */}
                <div className="pokemon-card">
                    <h2>{pokemon2.name.french}</h2>
                    <img src={pokemon2.image} alt={pokemon2.name.french} />
                    <div className="pokemon-types">
                        {pokemon2.type?.map((type) => (
                            <span key={type} className={getTypeClass(type)}>{type}</span>
                        ))}
                    </div>
                    <div className="pokemon-stats">
                        <p style={getStatStyle(pokemon2.base.HP, pokemon1.base.HP)}>HP: {pokemon2.base.HP}</p>
                        <p style={getStatStyle(pokemon2.base.Attack, pokemon1.base.Attack)}>Attack: {pokemon2.base.Attack}</p>
                        <p style={getStatStyle(pokemon2.base.Defense, pokemon1.base.Defense)}>Defense: {pokemon2.base.Defense}</p>
                        <p style={getStatStyle(pokemon1.base.Speed, pokemon2.base.Speed)}>Speed: {pokemon1.base.Speed}</p>
                        <p style={getStatStyle(pokemon1.base["Sp. Attack"], pokemon2.base["Sp. Attack"])}>Sp. Attack: {pokemon1.base["Sp. Attack"]}</p>
                        <p style={getStatStyle(pokemon1.base["Sp. Defense"], pokemon2.base["Sp. Defense"])}>Sp. Defense: {pokemon1.base["Sp. Defense"]}</p>
                    </div>
                    <div className="action-buttons">
                        <button className="action-button shiny-button" onClick={() => navigate(`/pokemon/${pokemon2.id}/shiny`)}>
                            Voir la version Shiny
                        </button>
                        <button className="action-button" onClick={() => navigate(`/pokemon/${pokemon2.id}`)}>
                            Voir pokemon en détail
                        </button>
                    </div>
                </div>
            </div>
            <button onClick={() => navigate('/home')}>Retour à l'accueil</button>
        </div>
    );
};

export default Compare; 