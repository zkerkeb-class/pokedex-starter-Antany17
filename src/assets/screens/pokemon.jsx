import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./pokemon.css";

const Pokemon = () => {
    const [pokemon, setPokemon] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/pokemons/${id}`).then(
            (response) => {
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
                alert("Pokemon supprimé avec succès")
                navigate("/home")
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
                alert("Pokemon modifié avec succès")
                setIsEditing(false);
            }
        ).catch((error) => {
            alert("Erreur lors de la modification du pokemon")
            console.log("🚀 ~ Pokemon ~ error:", error)
        })
    }

    // Fonction pour obtenir la classe CSS en fonction du type
    const getTypeClass = (type) => {
        return `type-name type-${type.toLowerCase()}`;
    };

    // Fonction pour mettre à jour les statistiques
    const updateBaseStat = (stat, value) => {
        setPokemon({
            ...pokemon,
            base: {
                ...pokemon.base,
                [stat]: parseInt(value) || 0
            }
        });
    };

    // Fonction pour mettre à jour les noms
    const updateName = (language, value) => {
        setPokemon({
            ...pokemon,
            name: {
                ...pokemon.name,
                [language]: value
            }
        });
    };

    return (
        <div className="pokemon-detail-container">
            <div className="pokemon-image-container">
                <img src={pokemon.image} alt={pokemon.name?.french} className="pokemon-detail-image" />
                <div className="pokemon-actions">
                    <button onClick={deletePokemon} className="delete-button">Supprimer le pokemon</button>
                    <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
                        {isEditing ? "Annuler" : "Modifier le pokemon"}
                    </button>
                    {isEditing && (
                        <button onClick={editPokemon} className="save-button">Enregistrer</button>
                    )}
                </div>
            </div>
            <div className="pokemon-info-container">
                <h1>{pokemon.name?.french}</h1>
                <div className="pokemon-types">
                    {pokemon.type?.map((type) => (
                        <span key={type} className={getTypeClass(type)}>{type}</span>
                    ))}
                </div>
                <div className="pokemon-stats">
                    <h2>Statistiques</h2>
                    <div className="stat-row">
                        <span>HP:</span>
                        {isEditing ? (
                            <input 
                                type="number" 
                                value={pokemon.base?.HP || 0} 
                                onChange={(e) => updateBaseStat('HP', e.target.value)} 
                                className="edit-input"
                            />
                        ) : (
                            <span>{pokemon.base?.HP}</span>
                        )}
                    </div>
                    <div className="stat-row">
                        <span>Attaque:</span>
                        {isEditing ? (
                            <input 
                                type="number" 
                                value={pokemon.base?.Attack || 0} 
                                onChange={(e) => updateBaseStat('Attack', e.target.value)} 
                                className="edit-input"
                            />
                        ) : (
                            <span>{pokemon.base?.Attack}</span>
                        )}
                    </div>
                    <div className="stat-row">
                        <span>Défense:</span>
                        {isEditing ? (
                            <input 
                                type="number" 
                                value={pokemon.base?.Defense || 0} 
                                onChange={(e) => updateBaseStat('Defense', e.target.value)} 
                                className="edit-input"
                            />
                        ) : (
                            <span>{pokemon.base?.Defense}</span>
                        )}
                    </div>
                    <div className="stat-row">
                        <span>Attaque Spé:</span>
                        {isEditing ? (
                            <input 
                                type="number" 
                                value={pokemon.base?.["Sp. Attack"] || 0} 
                                onChange={(e) => updateBaseStat('Sp. Attack', e.target.value)} 
                                className="edit-input"
                            />
                        ) : (
                            <span>{pokemon.base?.["Sp. Attack"]}</span>
                        )}
                    </div>
                    <div className="stat-row">
                        <span>Défense Spé:</span>
                        {isEditing ? (
                            <input 
                                type="number" 
                                value={pokemon.base?.["Sp. Defense"] || 0} 
                                onChange={(e) => updateBaseStat('Sp. Defense', e.target.value)} 
                                className="edit-input"
                            />
                        ) : (
                            <span>{pokemon.base?.["Sp. Defense"]}</span>
                        )}
                    </div>
                    <div className="stat-row">
                        <span>Vitesse:</span>
                        {isEditing ? (
                            <input 
                                type="number" 
                                value={pokemon.base?.Speed || 0} 
                                onChange={(e) => updateBaseStat('Speed', e.target.value)} 
                                className="edit-input"
                            />
                        ) : (
                            <span>{pokemon.base?.Speed}</span>
                        )}
                    </div>
                </div>
                <div className="pokemon-names">
                    <h2>Noms dans différentes langues</h2>
                    <div className="name-row">
                        <span>Français:</span>
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={pokemon.name?.french || ''} 
                                onChange={(e) => updateName('french', e.target.value)} 
                                className="edit-input"
                            />
                        ) : (
                            <span>{pokemon.name?.french}</span>
                        )}
                    </div>
                    <div className="name-row">
                        <span>Japonais:</span>
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={pokemon.name?.japanese || ''} 
                                onChange={(e) => updateName('japanese', e.target.value)} 
                                className="edit-input"
                            />
                        ) : (
                            <span>{pokemon.name?.japanese}</span>
                        )}
                    </div>
                    <div className="name-row">
                        <span>Chinois:</span>
            {isEditing ? (
                            <input 
                                type="text" 
                                value={pokemon.name?.chinese || ''} 
                                onChange={(e) => updateName('chinese', e.target.value)} 
                                className="edit-input"
                            />
                        ) : (
                            <span>{pokemon.name?.chinese}</span>
                        )}
                    </div>
                    <div className="name-row">
                        <span>Anglais:</span>
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={pokemon.name?.english || ''} 
                                onChange={(e) => updateName('english', e.target.value)} 
                                className="edit-input"
                            />
                        ) : (
                            <span>{pokemon.name?.english}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pokemon;