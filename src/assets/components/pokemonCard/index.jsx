/**
 * PokemonCard.jsx - Composant de carte Pokémon
 * Affiche les informations d'un Pokémon avec des fonctionnalités de sélection, favoris et version shiny
 */

import { useState } from "react";
import "./index.css";
import {useNavigate} from "react-router"
import FavoriteButton from "../favoriteButton";

const PokemonCard = ({ 
    id,           // ID du Pokémon
    name,         // Nom du Pokémon
    types,        // Types du Pokémon
    image,        // Image classique
    shinyImage,   // Image shiny
    attack,       // Points d'attaque
    defense,      // Points de défense
    hp,           // Points de vie
    isSelected,   // État de sélection pour la comparaison
    onSelect      // Callback de sélection
}) => {
    // États pour gérer l'affichage de l'image shiny
    const [currentImage, setCurrentImage] = useState(image);
    const [isShiny, setIsShiny] = useState(false);
    const navigate = useNavigate();

    /**
     * Bascule entre l'image classique et l'image shiny
     */
    const handleToggleImage = () => {
        if (isShiny) {
            setCurrentImage(image); // Affiche l'image classique
        } else {
            setCurrentImage(shinyImage); // Affiche l'image Shiny
            console.log(image)
        }
        setIsShiny(!isShiny); // Inverse l'état
    };

    /**
     * Navigue vers la page de détail du Pokémon
     */
    const goToPokemon = () => {
        console.log("🚀 ~ goToPokemon ~ id:", id)
        navigate(`/pokemon/${id}`)
    }

    /**
     * Retourne la classe CSS correspondant au type du Pokémon
     * @param {string} type - Type du Pokémon
     * @returns {string} - Classe CSS
     */
    const getTypeClass = (type) => {
        return `type-name type-${type.toLowerCase()}`;
    };

    return (
        <div className={`pokemon-card ${isShiny ? 'shiny' : ''}`}>
            {/* En-tête de la carte avec bouton favori et case à cocher */}
            <div className="card-header">
                <FavoriteButton id={id} />
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(id)}
                    className="compare-checkbox"
                />
            </div>

            {/* Nom du Pokémon */}
            <div className="pokemon-name-container">
                <span className="pokemon-name">{name}</span>
            </div>

            {/* Image du Pokémon */}
            <img className="pokemon-image" src={currentImage} alt={name} />

            {/* Types du Pokémon */}
            <div className="pokemon-types">
                {types.map((type) => (
                    <span key={type} className={getTypeClass(type)}>{type}</span>
                ))}
            </div>

            {/* Statistiques du Pokémon */}
            <div className="pokemon-stats-container">
                <span>Attack: {attack}</span>
                <span>Defense: {defense}</span>
                <span>HP: {hp}</span>
            </div>

            {/* Boutons d'action */}
            <div className="action-buttons">
                <button className="action-button shiny-button" onClick={handleToggleImage}>
                    {isShiny ? "Voir la version Classique" : "Voir la version Shiny"}
                </button>
                <button className="action-button" onClick={goToPokemon}>
                    Voir pokemon en détail
                </button>
            </div>
        </div>
    );
};

export default PokemonCard;
