import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const Pokemon = () => {
    const [pokemon, setPokemon] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    console.log("🚀 ~ Pokemon ~ params:", id)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/pokemons/${id}`).then(
            (response) => {
                console.log("🚀 ~ Pokemon ~ response:", response.data)
                setPokemon(response.data.pokemon)
            }
        ).catch((error) => {
            alert("Erreur lors de la récupération du pokemon")
            console.log("🚀 ~ Pokemon ~ error:", error)
        })


    },[])

    const deletePokemon = () => {

        if(window.confirm("Voulez-vous vraiment supprimer ce pokemon ?")){

        axios.delete(`http://localhost:3000/api/pokemons/${id}`).then(
            (response) => {
                console.log("🚀 ~ Pokemon ~ response:", response.data)
                alert("Pokemon supprimé avec succès")
                navigate("/")
            }
        ).catch((error) => {
            alert("Erreur lors de la suppression du pokemon")
            console.log("🚀 ~ Pokemon ~ error:", error)
        })
        }
    }

    const editPokemon = () => {
        axios.put(`http://localhost:3000/api/pokemons/${id}`,pokemon).then(
            (response) => {
                console.log("🚀 ~ Pokemon ~ response:", response.data)
                alert("Pokemon modifié avec succès")
                // setIsEditing(false)
            }
        ).catch((error) => {
            alert("Erreur lors de la modification du pokemon")
            console.log("🚀 ~ Pokemon ~ error:", error)
        })
    }


    return (
        <div>
            <h1>Pokemon {id}</h1>
            {isEditing ? (
                <input type="text" value={pokemon.name?.french} onChange={(e) => setPokemon({...pokemon, name: {...pokemon.name, french: e.target.value}})} />
            ) : (
                <p>{pokemon.name?.french}</p>
            )}
            <p>{pokemon.type}</p>
            <p>{pokemon.base?.hp}</p>
            <p>{pokemon.base?.attack}</p>
            <p>{pokemon.base?.defense}</p>
            <img src={pokemon.image} alt={pokemon.name?.french} />
            <p>{pokemon.name?.chinese}</p>
            <button onClick={deletePokemon}>Supprimer le pokemon</button>
            <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Annuler" : "Modifier le pokemon"}</button>
            {isEditing && (
                <button onClick={editPokemon}>Enregistrer</button>
            )}
        </div>
    )
}

export default Pokemon;