import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import style from "./Detail.module.css";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios(`http://localhost:3001/recipes/${id}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return setData({});
  }, []);

  return (
    <div className={style.mainContainer}>
      <div className={style.buttonContainer}>
        <BasicNavBar />
      </div>
      {loading ? (
        <p className={style.loading}>Loading...</p>
      ) : (
        <div className={style.detailContainer}>
          <img className={style.detailImage} src={data.image} alt="recipe" />
          <h5 className={style.detailId}>{data.id}</h5>
          <h3 className={style.detailRecipeTitle}>{data.title}</h3>
          <p className={style.detailDescription}>{data.description}</p>
          <p className={style.detailHealthScore}>
            Health Score: {data.healthScore}
          </p>
          <div className={style.divList}>
            <h3>Step By Step</h3>
            <ol className={style.listaStep}>
              {data.analyzedInstructions[0].steps?.map((step) => (
                <li key={Math.random(1, 10)} className={style.listItemStep}>
                  {step.step}
                </li>
              ))}
            </ol>
          </div>
          <ul className={style.detailDiets}>
            {data.diets?.map((diet) => (
              <li key={Math.random(1, 10)} className={style.detailDiet}>
                {diet}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
