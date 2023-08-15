import Card from "../Card/Card";
import style from "./Cards.module.css";

function Cards({ allRecipes }) {
  return (
    <div className={style.mainCardContainer}>
      {allRecipes?.map((recipe, index) => (
        <Card recipe={recipe} key={index} />
      ))}
    </div>
  );
}

export default Cards;
