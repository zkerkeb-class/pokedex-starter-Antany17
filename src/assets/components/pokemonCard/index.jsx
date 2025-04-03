import { useState } from "react";
import "./index.css";
import {useNavigate} from "react-router"

const PokemonCard = ({ id,name, types, image, shinyImage, attack, defense, hp }) => {
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
      <button onClick={handleToggleImage}>
        {isShiny ? "Voir la version Classique" : "Voir la version Shiny"}
      </button>
      <button onClick={goToPokemon}>
        Voir pokemon en détail
      </button>
    </div>
  );
};

export default PokemonCard;
