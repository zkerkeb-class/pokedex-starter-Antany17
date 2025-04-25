import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './compare.css';

const Compare = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pokemon1, pokemon2 } = location.state || {};

    if (!pokemon1 || !pokemon2) {
        return (
            <div className="compare-container">
                <h1>Erreur</h1>
                <p>Les Pokémon à comparer n'ont pas été trouvés</p>
                <button onClick={() => navigate('/home')}>Retour à l'accueil</button>
            </div>
        );
    }

    return (
        <div className="compare-container">
            <h1>Comparaison de Pokémon</h1>
            <div className="compare-pokemons">
                <div className="pokemon-card">
                    <h2>{pokemon1.name.french}</h2>
                    <img src={pokemon1.image} alt={pokemon1.name.french} />
                    <div className="pokemon-stats">
                        <p>HP: {pokemon1.base.HP}</p>
                        <p>Attack: {pokemon1.base.Attack}</p>
                        <p>Defense: {pokemon1.base.Defense}</p>
                    </div>
                </div>
                <div className="vs">VS</div>
                <div className="pokemon-card">
                    <h2>{pokemon2.name.french}</h2>
                    <img src={pokemon2.image} alt={pokemon2.name.french} />
                    <div className="pokemon-stats">
                        <p>HP: {pokemon2.base.HP}</p>
                        <p>Attack: {pokemon2.base.Attack}</p>
                        <p>Defense: {pokemon2.base.Defense}</p>
                    </div>
                </div>
            </div>
            <button onClick={() => navigate('/home')}>Retour à l'accueil</button>
        </div>
    );
};

export default Compare; 