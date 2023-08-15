import style from "./SearchBar.module.css";

function SearchBar({ handleChange, handleSubmit }) {
  return (
    <div>
      <form className={style.searchBarContainer} onChange={handleChange}>
        <input placeholder="  Buscar Receta" type="search" />
        <button type="submit" onClick={handleSubmit}>
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
