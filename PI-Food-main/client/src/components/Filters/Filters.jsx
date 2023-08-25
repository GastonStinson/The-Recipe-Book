import { useDispatch } from "react-redux";
import {
  filterByDiet,
  resetFilter,
  filterOrigin,
  orderAlphAZ,
  orderAlphZA,
  orderHSAsc,
  orderHSDes,
  firstPage,
} from "../../redux/actions/actions";
import style from "./Filters.module.css";

function Filters({ diets, allRecipes }) {
  const dispatch = useDispatch();
  //MANEJADORES DE CAMBIOS FILTROS
  const handleSelectDiet = (event) => {
    event.preventDefault();
    dispatch(filterByDiet(event.target.value));
    dispatch(firstPage());
  };

  const handleSelectOrigin = (event) => {
    event.preventDefault();

    if (event.target.value === "All Origin") {
      return;
    } else if (event.target.value === "DB") {
      const filteredFromDB = allRecipes.filter(
        (recipe) => recipe.id.toString().length === 36
      );
      return dispatch(filterOrigin(filteredFromDB));
    } else if (event.target.value === "API") {
      const filteredFromAPI = allRecipes.filter(
        (recipe) => recipe.id.toString().length !== 36
      );
      return dispatch(filterOrigin(filteredFromAPI));
    }
  };

  const handleSelectOrder = (event) => {
    event.preventDefault();
    if (event.target.value === "Alph. A/Z") {
      dispatch(orderAlphAZ());
    } else if (event.target.value === "Alph. Z/A") {
      dispatch(orderAlphZA());
    } else if (event.target.value === "HScore +/-") {
      dispatch(orderHSAsc());
    } else if (event.target.value === "HScore -/+") {
      dispatch(orderHSDes());
    }
  };
  //RESET FILTROS
  const handleResetFilters = (event) => {
    event.preventDefault();
    dispatch(resetFilter());
  };

  return (
    <div className={style.filterContainer}>
      <select name="selectDiet" onChange={handleSelectDiet}>
        <option>All Diets</option>
        {diets?.map((diet, index) => (
          <option key={index}>{diet}</option>
        ))}
      </select>
      <select name="selectOrigin" onChange={handleSelectOrigin}>
        <option>All Origin</option>
        <option>DB</option>
        <option>API</option>
      </select>
      <select name="selectOrder" onChange={handleSelectOrder}>
        <option>Order</option>
        <option>Alph. A/Z</option>
        <option>Alph. Z/A</option>
        <option>HScore +/-</option>
        <option>HScore -/+</option>
      </select>
      <button onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
}

export default Filters;
