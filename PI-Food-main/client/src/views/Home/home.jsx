import Cards from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getByName, getDiets, getRecipes } from "../../redux/actions/actions";
import NavBar from "../../components/NavBar/NavBar";
import style from "./Home.module.css";
import Filters from "../../components/Filters/Filters";

function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const diets = useSelector((state) => state.diets);

  const [toSearch, setToSearch] = useState("");

  //IMPLEMENTACION PAGINADO QUE MUESTRA DE A 9 RECETAS POR PAGINA
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const recipesToShow = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(allRecipes.length / recipesPerPage);

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handleChange(event) {
    setToSearch(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getByName(toSearch));
  }

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div>
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      <div className={style.homeContainer}>
        <div className={style.upperContainer}>
          <div className={style.leftContainer}>
            <h2>Fun and Easy, to become a Master Cook</h2>
            <p>
              Explora nuestra selección de recetas irresistibles. Desde clásicos
              reconfortantes hasta platos audaces, nuestras instrucciones
              detalladas y consejos expertos te guiarán en tu aventura
              culinaria. Descubre el placer de cocinar y crear momentos
              inolvidables alrededor de la mesa.
            </p>
          </div>
          <div className={style.rightContainer}>
            <img
              src="https://images.healthshots.com/healthshots/en/uploads/2023/01/12145340/cooking.jpg"
              alt="cooking"
            />
          </div>
        </div>
        <div className={style.filterContainer}>
          <Filters diets={diets} />
        </div>
        <Cards allRecipes={recipesToShow} />

        <div className={style.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <p> Page {currentPage}</p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
