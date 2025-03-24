import { useState } from "react";
import "./index.css";

const PokemonCard = ({ name, types, image, shinyImage, attack, defense, hp }) => {
  const [currentHP, setCurrentHP] = useState(hp);
  const [currentImage, setCurrentImage] = useState(image);
  const [isShiny, setIsShiny] = useState(false);

  const handleToggleImage = () => {
    if (isShiny) {
      setCurrentImage(image); // Affiche l'image classique
    } else {
      setCurrentImage(shinyImage); // Affiche l'image Shiny
    }
    setIsShiny(!isShiny); // Inverse l'état
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-name-container">
        <span className="pokemon-name">{name}</span>
      </div>
      <img className="pokemon-image" src={currentImage} alt={name} />
      <div className="pokemon-types-container">
        {types.map((type) => (
          <span key={type}>{type}</span>
        ))}
      </div>
      <div className="pokemon-stats-container">
        <span>Attack: {attack}</span>
        <span>Defense: {defense}</span>
        <span>HP: {currentHP}</span>
      </div>
      <button onClick={handleToggleImage}>
        {isShiny ? "Voir la version Classique" : "Voir la version Shiny"}
      </button>
    </div>
  );
};

export default PokemonCard;
