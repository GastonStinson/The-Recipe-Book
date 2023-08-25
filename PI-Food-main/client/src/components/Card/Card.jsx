import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Card.module.css";

function Card({ recipe }) {
  const { title, image, diets, id, healthScore } = recipe;

  return (
    <div className={style.cardContainer}>
      <Link to={`/detail/${id}`} className={style.linkContainer}>
        <img src={image} alt="recipe" />
        <div className={style.hSContainer}>
          <p> Health Score: {healthScore}</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="#FFD600"
              stroke="#FFD600"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2>{title}</h2>

        <ul className={style.dietList}>
          {diets?.map((diet, index) => (
            <li key={index}>{diet}</li>
          ))}
        </ul>
      </Link>
    </div>
  );
}

export default Card;
