import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import style from "./Detail.module.css";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:3001/recipes/${id}`);
        setData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();

    return setData({});
  }, [id]);

  return (
    <div>
      <BasicNavBar />
      <div className={style.mainContainer}>
        {loading ? (
          <p className={style.loading}>Loading...</p>
        ) : (
          <div className={style.detailContainer}>
            <div className={style.centerDetailContainer}>
              <div className={style.leftContainer}>
                <p className={style.detailId}>ID : {data.id}</p>
                <h3 className={style.detailRecipeTitle}>{data.title}</h3>
                <h6 className={style.detailHealthScore}>
                  Health Score: <span>{data.healthScore}</span>
                </h6>
              </div>

              <div className={style.rightContainer}>
                <img
                  className={style.detailImage}
                  src={data.image}
                  alt="recipe"
                />
              </div>
            </div>

            <div className={style.bottomContainer}>
              <div className={style.detailDescription}>
                <p>
                  {
                    //RENDERIZADO SUMMARY (HTML)
                    data.summary
                      ? (() => {
                          const tempElement = document.createElement("div");
                          tempElement.innerHTML = data.summary;
                          return (
                            tempElement.textContent || tempElement.innerText
                          );
                        })()
                      : data.description
                  }
                </p>
              </div>
              <div className={style.divList}>
                <h3>Step By Step</h3>
                <ol className={style.listaStep}>
                  {id.toString().length === 36
                    ? data.stepByStep?.map((step, index) => (
                        <li key={index} className={style.listItemStep}>
                          {step}
                        </li>
                      ))
                    : data.analyzedInstructions[0].steps?.map((step, index) => (
                        <li key={index} className={style.listItemStep}>
                          {step.step}
                        </li>
                      ))}
                </ol>
              </div>
              <ul className={style.detailDiets}>
                {data.diets?.map((diet, index) => (
                  <li key={index} className={style.detailDiet}>
                    {diet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
