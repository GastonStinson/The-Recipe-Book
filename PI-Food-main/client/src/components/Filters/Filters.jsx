import { useDispatch } from "react-redux";
import {
  filterByDiet,
  resetFilter,
  filterOrigin,
} from "../../redux/actions/actions";
import style from "./Filters.module.css";

function Filters({ diets }) {
  const dispatch = useDispatch();

  const handleSelectDiet = (event) => {
    event.preventDefault();
    dispatch(resetFilter());
    dispatch(filterByDiet(event.target.value));
  };

  const handleSelectOrigin = (event) => {
    event.preventDefault();
    dispatch(resetFilter());
    dispatch(filterOrigin(event.target.value));
  };

  const handleSelectOrder = (event) => {};

  return (
    <div className={style.filterContainer}>
      <select name="selectDiet" onChange={handleSelectDiet}>
        <option>All Diets</option>
        {diets?.map((diet, index) => (
          <option key={index}>{diet}</option>
        ))}
      </select>
      <select name="selectOrigin" onChange={handleSelectOrigin}>
        <option>Origin</option>
        <option>DB</option>
        <option>API</option>
      </select>
      <select name="selectOrder" onChange={handleSelectOrder}>
        <option>Order</option>
        <option>Alphabetically A/Z</option>
        <option>Alphabetically Z/A</option>
        <option>Health Score +/-</option>
        <option>Health Score -/+</option>
      </select>
    </div>
  );
}

export default Filters;
