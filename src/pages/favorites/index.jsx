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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-start', 
        marginBottom: '20px' 
      }}>
        <h1>Mes Favoris</h1>
      </div>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '10px',
        position: 'absolute',
        top: '15px',
        right: '15px'
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
        
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
          style={{
            padding: '8px 15px',
            backgroundColor: '#ff4444',
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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Déconnexion
        </button>
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