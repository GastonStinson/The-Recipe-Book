import Cards from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  firstPage,
  getByName,
  getDiets,
  getRecipes,
  paginado,
} from "../../redux/actions/actions";
import NavBar from "../../components/NavBar/NavBar";
import style from "./Home.module.css";
import Filters from "../../components/Filters/Filters";
import Intro from "../../components/Intro/Intro";

function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const diets = useSelector((state) => state.diets);
  const page = useSelector((state) => state.page);

  const [toSearch, setToSearch] = useState("");

  //IMPLEMENTACION PAGINADO QUE MUESTRA DE A 9 RECETAS POR PAGINA

  const recipesPerPage = 9;

  const indexOfLastRecipe = page * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const recipesToShow = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  //CALCULO CANTIDAD DE PAGINAS NECESARIAS
  const totalPages = Math.ceil(allRecipes.length / recipesPerPage);

  //MANEJADORES DE PAGINAS PREV Y NEXT
  function handlePrevPage() {
    dispatch(paginado("prev", page));
  }

  function handleNextPage() {
    dispatch(paginado("next", page));
  }

  //FUNCIONES BARRA DE BUSQUEDA
  function handleChange(event) {
    setToSearch(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getByName(toSearch));
    dispatch(firstPage());
  }

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div>
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      <div className={style.homeContainer}>
        <Intro />
        <div className={style.filterContainer}>
          <Filters diets={diets} allRecipes={allRecipes} />
        </div>
        <Cards allRecipes={recipesToShow} />

        <div className={style.pagination}>
          <button onClick={handlePrevPage} disabled={page === 1}>
            Prev
          </button>
          <p> Page {page}</p>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
