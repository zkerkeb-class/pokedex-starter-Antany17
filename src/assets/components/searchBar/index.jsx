import "./index.css";

const typesList = [
    "Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire",
    "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison",
    "Psychic", "Rock", "Steel", "Water"
];

const SearchBar = ({ search, setSearch, types, setTypes }) => {
  return (
    <div className="search-container">
      <div className="search-input-container">
        <i className="fas fa-search search-icon"></i>
        <input
          value={search}
          onChange={(e) => {
              setSearch(e.target.value)
          }}
          type="text"
          placeholder="Rechercher un pokemon..."
          className="search-bar"
        />
      </div>
      <div className="types-container">
        {typesList.map((type) => {
            return <button 
            className={`type-button ${types.includes(type) ? 'active' : ''}`}
            onClick={() => {
              if(types.includes(type)){
                setTypes(types.filter((t) => t !== type))
              } else {
                setTypes([...types, type])
              }
            }}
            key={type}>{type}</button>
        })}
      </div>
    </div>
  );
};

export default SearchBar;
