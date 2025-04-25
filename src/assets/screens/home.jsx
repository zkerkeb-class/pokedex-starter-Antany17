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
  const [selectedPokemons, setSelectedPokemons] = useState([])
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

  const handleSelectPokemon = (pokemonId) => {
    setSelectedPokemons(prev => {
      if (prev.includes(pokemonId)) {
        return prev.filter(id => id !== pokemonId)
      } else if (prev.length < 2) {
        return [...prev, pokemonId]
      }
      return prev
    })
  }

  const handleCompare = () => {
    if (selectedPokemons.length !== 2) {
      alert("Veuillez sélectionner exactement 2 Pokémon à comparer")
      return
    }

    const pokemon1 = pokemons.find(p => p._id === selectedPokemons[0])
    const pokemon2 = pokemons.find(p => p._id === selectedPokemons[1])

    if (!pokemon1 || !pokemon2) {
      alert("Erreur lors de la sélection des Pokémon")
      return
    }

    navigate('/compare', { state: { pokemon1, pokemon2 } })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="app-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => navigate('/favorites')}
            style={{
              padding: '5px 10px',
              backgroundColor: '#ffd700',
              border: 'none',
              color: '#333',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Favoris
          </button>
          {selectedPokemons.length === 2 && (
            <button 
              onClick={handleCompare}
              style={{
                padding: '5px 10px',
                backgroundColor: '#4CAF50',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Comparer
            </button>
          )}
        </div>
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

      <SearchBar types={types} setTypes={setTypes} search={search} setSearch={setSearch} />

      <div className="pokemon-list">
        {pokemons.map((pokemon) => {
          const isTypeIncluded = types.length === 0 || types.every(type => pokemon.type.includes(type))
          const isNameIncluded = search === "" || pokemon.name.french.toLowerCase().includes(search.toLowerCase())

          if(!isNameIncluded || !isTypeIncluded){
            return null
          }
          
          return (
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
          )
        })}
      </div>
    </div>
  )
}

export default Home