import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import pokemons from '../assets/pokemons'
import PokemonCard from '../components/pokemonCard'
import SearchBar from '../components/searchBar'
import './home.css'
import axios from 'axios'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [search, setSearch] = useState("")
  const [types, setTypes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3000/api/pokemons").then(
      (response) => {
        setPokemons(response.data.pokemons)
      }
    ).catch((error) => {
      alert("Erreur lors de la récupération des pokemons")
      console.log("🚀 ~ Home ~ error:", error)
    })
  }, [])

  useEffect(() => {
    console.log(search)
    console.log('types', types)
  }, [search, types])

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
    // Rediriger vers la page de connexion
    navigate('/');
  };

  return (
    <div className="app-container">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '10px',
          position: 'absolute',
          top: '15px',
          right: '15px'
        }}>
          <button 
            onClick={() => navigate('/favorites')}
            style={{
              padding: '8px 15px',
              backgroundColor: '#ffd700',
              border: 'none',
              color: '#333',
              cursor: 'pointer',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '16px',
              width: '150px'
            }}
          >
            Mon Pokédex
          </button>
          <button 
            onClick={handleLogout}
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

      <SearchBar types={types} setTypes={setTypes} search={search} setSearch={setSearch}/>

      <div className="pokemon-list">
        {pokemons.map((pokemon) => {
          const isTypeIncluded = types.length === 0 || types.every(type => pokemon.type.includes(type))
          const isNameIncluded = search === "" || pokemon.name.french.toLowerCase().includes(search.toLowerCase())

          if(!isNameIncluded || !isTypeIncluded){
            return null
          }
          
          return (
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
          )
        })}
      </div>
    </div>
  )
}

export default Home