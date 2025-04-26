import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getFavorites, removeFromFavorites } from '../services/favoritesService';
import PokemonCard from '../components/pokemonCard';
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
        if (selectedPokemons.length !== 2) {
            alert("Veuillez sélectionner exactement 2 Pokémon à comparer");
            return;
        }

        const pokemon1 = favorites.find(p => p._id === selectedPokemons[0]);
        const pokemon2 = favorites.find(p => p._id === selectedPokemons[1]);

        if (!pokemon1 || !pokemon2) {
            alert("Erreur lors de la sélection des Pokémon");
            return;
        }

        navigate('/compare', { state: { pokemon1, pokemon2 } });
    };

    const handleSelectPokemon = (pokemonId) => {
        setSelectedPokemons(prev => {
            if (prev.includes(pokemonId)) {
                return prev.filter(id => id !== pokemonId);
            } else if (prev.length < 2) {
                return [...prev, pokemonId];
            }
            return prev;
        });
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
            <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                marginBottom: '20px' 
            }}>
                <button 
                    onClick={() => navigate('/home')}
                    style={{
                        padding: '8px 15px',
                        backgroundColor: '#ffd700',
                        border: 'none',
                        color: '#333',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        width: '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5"></path>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Retour
                </button>
                
                {selectedPokemons.length === 2 && (
                    <button 
                        onClick={handleCompare}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            width: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        Comparer
                    </button>
                )}
            </div>
            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>Vous n'avez pas encore de Pokémon favoris</p>
                </div>
            ) : (
                <div className="pokemon-list">
                    {favorites.map((pokemon) => (
                        <div key={pokemon._id} className="pokemon-card-container">
                            <PokemonCard 
                                id={pokemon._id}
                                name={pokemon.name.french} 
                                types={pokemon.type} 
                                image={pokemon.image}
                                shinyImage={pokemon.imageShiny}
                                attack={pokemon.base.Attack}
                                defense={pokemon.base.Defense}
                                hp={pokemon.base.HP}
                                isSelected={selectedPokemons.includes(pokemon._id)}
                                onSelect={handleSelectPokemon}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites; 