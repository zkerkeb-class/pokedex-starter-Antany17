import { useState, useEffect } from 'react';
import './index.css';

const FavoriteButton = ({ id }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Vérifier si le Pokémon est dans les favoris au chargement
    checkFavoriteStatus();
  }, [id]);

  const checkFavoriteStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setIsFavorite(data.favorites.includes(id));
    } catch (error) {
      console.error('Erreur lors de la vérification des favoris:', error);
    }
  };

  const toggleFavorite = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Veuillez vous connecter pour ajouter aux favoris');
        return;
      }

      if (isFavorite) {
        // Supprimer des favoris
        await fetch(`http://localhost:3000/api/favorites/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        // Ajouter aux favoris
        await fetch('http://localhost:3000/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ pokemonId: id })
        });
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Erreur lors de la modification des favoris:', error);
      alert('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
      onClick={toggleFavorite}
      disabled={isLoading}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
};

export default FavoriteButton; 