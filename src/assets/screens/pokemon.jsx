/**
 * Pokemon.jsx - Page de détail d'un Pokémon
 * Affiche les informations détaillées d'un Pokémon avec possibilité de modification
 */

import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./pokemon.css";

const Pokemon = () => {
    // États pour gérer les données et l'interface
    const [pokemon, setPokemon] = useState({});         // Données du Pokémon
    const [isEditing, setIsEditing] = useState(false);  // Mode édition
    const {id} = useParams();                          // ID du Pokémon depuis l'URL
    const navigate = useNavigate();

    /**
     * Charge les données du Pokémon au montage du composant
     */
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

    /**
     * Supprime le Pokémon
     */
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

    /**
     * Met à jour les données du Pokémon
     */
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

    /**
     * Retourne la classe CSS correspondant au type du Pokémon
     * @param {string} type - Type du Pokémon
     * @returns {string} - Classe CSS
     */
    const getTypeClass = (type) => {
        return `type-name type-${type.toLowerCase()}`;
    };

    /**
     * Met à jour une statistique du Pokémon
     * @param {string} stat - Nom de la statistique
     * @param {string} value - Nouvelle valeur
     */
    const updateBaseStat = (stat, value) => {
        setPokemon({
            ...pokemon,
            base: {
                ...pokemon.base,
                [stat]: parseInt(value) || 0
            }
        });
    };

    /**
     * Met à jour le nom du Pokémon dans une langue spécifique
     * @param {string} language - Langue du nom
     * @param {string} value - Nouveau nom
     */
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
            {/* Bouton de retour */}
            <div className="pokemon-header">
                <button 
                    onClick={() => navigate('/home')}
                    className="back-button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5"></path>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Retour
                </button>
            </div>

            {/* Section image et actions */}
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

            {/* Section informations */}
            <div className="pokemon-info-container">
                <h1>{pokemon.name?.french}</h1>
                
                {/* Types du Pokémon */}
                <div className="pokemon-types">
                    {pokemon.type?.map((type) => (
                        <span key={type} className={getTypeClass(type)}>{type}</span>
                    ))}
                </div>

                {/* Statistiques du Pokémon */}
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

                {/* Noms dans différentes langues */}
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