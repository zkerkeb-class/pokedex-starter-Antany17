import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../../assets/components/pokemonCard';
import './index.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:3000/api/favorites', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setFavorites(data.favorites);

        // Récupérer les détails de chaque Pokémon favori
        const detailsPromises = data.favorites.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
        );
        const details = await Promise.all(detailsPromises);
        setPokemonDetails(details);
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  if (isLoading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="favorites-page">
      <h1>Mon Pokédex Personnel</h1>
      {favorites.length === 0 ? (
        <p className="no-favorites">Vous n'avez pas encore de Pokémon favoris</p>
      ) : (
        <div className="favorites-grid">
          {pokemonDetails.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types.map(t => t.type.name)}
              image={pokemon.sprites.front_default}
              shinyImage={pokemon.sprites.front_shiny}
              attack={pokemon.stats.find(s => s.stat.name === 'attack').base_stat}
              defense={pokemon.stats.find(s => s.stat.name === 'defense').base_stat}
              hp={pokemon.stats.find(s => s.stat.name === 'hp').base_stat}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; 