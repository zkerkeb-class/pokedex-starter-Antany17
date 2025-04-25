import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getFavorites, removeFromFavorites } from '../services/favoritesService';
import './favorites.css';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [selectedPokemons, setSelectedPokemons] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                const favs = await getFavorites(user.uid);
                setFavorites(favs);
            }
        };
        fetchFavorites();
    }, [user]);

    const handleRemoveFromFavorites = async (pokemonId) => {
        if (user) {
            await removeFromFavorites(user.uid, pokemonId);
            setFavorites(favorites.filter(p => p._id !== pokemonId));
            setSelectedPokemons(selectedPokemons.filter(id => id !== pokemonId));
        }
    };

    const handleCompare = () => {
        if (selectedPokemons.length === 2) {
            const pokemon1 = favorites.find(p => p._id === selectedPokemons[0]);
            const pokemon2 = favorites.find(p => p._id === selectedPokemons[1]);
            navigate('/compare', { state: { pokemon1, pokemon2 } });
        }
    };

    const togglePokemonSelection = (pokemonId) => {
        if (selectedPokemons.includes(pokemonId)) {
            setSelectedPokemons(selectedPokemons.filter(id => id !== pokemonId));
        } else if (selectedPokemons.length < 2) {
            setSelectedPokemons([...selectedPokemons, pokemonId]);
        }
    };

    if (!user) {
        return (
            <div className="favorites-container">
                <h1>Mes Favoris</h1>
                <p>Veuillez vous connecter pour voir vos favoris</p>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <h1>Mes Favoris</h1>
            {selectedPokemons.length === 2 && (
                <button 
                    className="compare-button"
                    onClick={handleCompare}
                >
                    Comparer les Pokémon sélectionnés
                </button>
            )}
            <div className="favorites-grid">
                {favorites.map((pokemon) => (
                    <div 
                        key={pokemon._id} 
                        className={`pokemon-card ${selectedPokemons.includes(pokemon._id) ? 'selected' : ''}`}
                    >
                        <img src={pokemon.image} alt={pokemon.name.french} />
                        <h3>{pokemon.name.french}</h3>
                        <div className="pokemon-types">
                            {pokemon.type?.map((type) => (
                                <span key={type} className={`type-name type-${type.toLowerCase()}`}>
                                    {type}
                                </span>
                            ))}
                        </div>
                        <div className="card-actions">
                            <button 
                                className="select-button"
                                onClick={() => togglePokemonSelection(pokemon._id)}
                            >
                                {selectedPokemons.includes(pokemon._id) ? 'Désélectionner' : 'Sélectionner'}
                            </button>
                            <button 
                                className="view-button"
                                onClick={() => navigate(`/pokemon/${pokemon._id}`)}
                            >
                                Voir détails
                            </button>
                            <button 
                                className="remove-button"
                                onClick={() => handleRemoveFromFavorites(pokemon._id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites; 