import { useEffect, useState } from 'react'
// import pokemons from '../assets/pokemons'
import PokemonCard from '../components/pokemonCard'
import SearchBar from '../components/searchBar'
import './home.css'
import axios from 'axios'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [search, setSearch] = useState("")
  const [types, setTypes] = useState([])

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

  return (
    <div className="app-container">
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
