import style from "./SearchBar.module.css";

function SearchBar({ handleChange, handleSubmit }) {
  //RECIBE POR PROPS LAS FUNCIONES ALOJADAS EN HOME Y LAS UTILIZA
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
