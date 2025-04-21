import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PokemonCard from '../../components/pokemonCard'
import './index.css'
import axios from 'axios'

function Favorites() {
  const [pokemons, setPokemons] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Récupérer les pokémons favoris depuis l'API
    axios.get("http://localhost:3000/api/favorites", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(
      (response) => {
        // Récupérer les détails des Pokémon favoris
        const favoriteIds = response.data.favorites;
        console.log("IDs des favoris:", favoriteIds); // Debug
        
        axios.get("http://localhost:3000/api/pokemons").then(
          (pokemonResponse) => {
            const allPokemons = pokemonResponse.data.pokemons;
            console.log("Tous les Pokémon:", allPokemons); // Debug
            
            const favoritePokemons = allPokemons.filter(pokemon => 
              favoriteIds.includes(pokemon.id)
            );
            console.log("Pokémon favoris trouvés:", favoritePokemons); // Debug
            
            setPokemons(favoritePokemons);
          }
        ).catch((error) => {
          console.error("Erreur lors de la récupération des Pokémon:", error);
          alert("Erreur lors de la récupération des Pokémon");
        });
      }
    ).catch((error) => {
      console.error("Erreur lors de la récupération des favoris:", error);
      alert("Erreur lors de la récupération des pokemons favoris")
    })
  }, [])

  return (
    <div className="app-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Mes Favoris</h1>
        <button 
          onClick={() => navigate('/home')}
          style={{
            padding: '5px 10px',
            backgroundColor: '#ffd700',
            border: 'none',
            color: '#333',
            cursor: 'pointer'
          }}
        >
          Retour
        </button>
      </div>

      {pokemons.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Vous n'avez pas encore de Pokémon favoris</p>
        </div>
      ) : (
        <div className="pokemon-list">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card-container">
              <PokemonCard 
                id={pokemon._id}
                name={pokemon.name.french} 
                types={pokemon.type} 
                image={pokemon.image}
                shinyImage={pokemon.imageShiny}
                attack={pokemon.base.Attack}
                defense={pokemon.base.Defense}
                hp={pokemon.base.HP}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites