import { useState } from "react";
import "./index.css";
import {useNavigate} from "react-router"
import FavoriteButton from "../favoriteButton";

const PokemonCard = ({ id, name, types, image, shinyImage, attack, defense, hp, isSelected, onSelect }) => {
  const [currentImage, setCurrentImage] = useState(image);
  const [isShiny, setIsShiny] = useState(false);
  const navigate = useNavigate();

  const handleToggleImage = () => {
    if (isShiny) {
      setCurrentImage(image); // Affiche l'image classique
    } else {
      setCurrentImage(shinyImage); // Affiche l'image Shiny
      console.log(image)
    }
    setIsShiny(!isShiny); // Inverse l'état
  };

  const goToPokemon = () => {
    console.log("🚀 ~ goToPokemon ~ id:", id)
    navigate(`/pokemon/${id}`)
  }
  const getTypeClass = (type) => {
    return `type-name type-${type.toLowerCase()}`;
  };


  return (
    <div className={`pokemon-card ${isShiny ? 'shiny' : ''}`}>
      <div className="card-header">
        <FavoriteButton id={id} />
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(id)}
          className="compare-checkbox"
        />
      </div>
      <div className="pokemon-name-container">
        <span className="pokemon-name">{name}</span>
      </div>
      <img className="pokemon-image" src={currentImage} alt={name} />
      <div className="pokemon-types">
        {types.map((type) => (
          <span key={type} className={getTypeClass(type)}>{type}</span>
        ))}
      </div>
      <div className="pokemon-stats-container">
        <span>Attack: {attack}</span>
        <span>Defense: {defense}</span>
        <span>HP: {hp}</span>
      </div>
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
