import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PokemonCard from '../../assets/components/pokemonCard'
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
        setPokemons(response.data.favorites);
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => navigate('/home')}
            style={{
              padding: '5px 10px',
              backgroundColor: '#ffd700',
              border: 'none',
              color: '#333',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Retour
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
            style={{
              padding: '5px 10px',
              backgroundColor: '#ff4444',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Déconnexion
          </button>
        </div>
      </div>

      {pokemons.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Vous n'avez pas encore de Pokémon favoris</p>
        </div>
      ) : (
        <div className="pokemon-list">
          {pokemons.map((pokemon) => (
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
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites 