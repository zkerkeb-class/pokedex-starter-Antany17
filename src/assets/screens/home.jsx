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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button 
          onClick={handleLogout}
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
