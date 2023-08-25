import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../../redux/actions/actions";
import validate from "./validate";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Form() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const history = useHistory();

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [input, setInput] = useState({
    title: "",
    image: "",
    description: "",
    healthScore: 0,
    stepByStep: [],
    diets: [],
  });

  const [errors, setErrors] = useState({});

  //MANEJADOR DE CAMBIOS GENERALES DE INPUT Y ERRORS
  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrors(validate({ ...input, [event.target.name]: event.target.value }));
  };

  //MANEJADOR DE CAMBIOS EN STEPBYSTEP
  const handleStepByStep = (event) => {
    setInput({
      ...input,
      stepByStep: event.target.value.split("-"),
    });
  };

  //MANEJADOR DE CAMBIOS EN CHECKBOX DIETS
  const handleCheckboxChange = (event) => {
    //CONTROLAR SI YA ESTA DENTRO DEL ARRAY, SI ES ASI ELIMINARLA
    if (input.diets.includes(event.target.value)) {
      const lastDiets = input.diets.filter(
        (diet) => diet !== event.target.value
      );
      setInput({
        ...input,
        diets: lastDiets,
      });
    } else {
      setInput({
        ...input,
        diets: [...input.diets, event.target.value],
      });
    }
  };

  //MANEJADOR DE ENVIO DE FORMULARIO
  const submitHandler = async (event) => {
    event.preventDefault();

    //POST AL SERVIDOR CON EL ESTADO LOCAL
    const { data } = await axios.post("http://localhost:3001/recipes", input);
    console.log(data);
    //REDIRECCION A LA PANTALLA DE HOME
    history.push("/home");
  };

  return (
    <div>
      <div className={style.container}>
        <h2>CREATE YOUR RECIPE </h2>
        <div className={style.formContainer}>
          <form onSubmit={submitHandler}>
            <div className={style.formGroup}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title..."
              />
              <p className={style.error}>{errors.e1}</p>
            </div>
            <div>
              <label>Image</label>
              <input
                type="text"
                name="image"
                onChange={handleChange}
                placeholder="Image URL..."
              />
            </div>
            <p className={style.error}>{errors.e2}</p>
            <div>
              <label>Description</label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                placeholder="Description here..."
              />
            </div>
            <p className={style.error}> {errors.e3}</p>
            <div>
              <label>Health Score</label>
              <input
                type="number"
                name="healthScore"
                onChange={handleChange}
                placeholder="Health Score 1 - 100"
              />
            </div>
            <p className={style.error}>{errors.e4}</p>
            <div>
              <label>Step By Step</label>
              <input
                type="text"
                name="stepByStep"
                onChange={handleStepByStep}
                placeholder="Step one - Step two - Step three"
              />
              <p>
                * IMPORTANT * <br /> Separate steps using hyphen " - "
              </p>
            </div>
            <div className={style.checkboxContainer}>
              {diets?.map((diet, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={diet}
                      onChange={handleCheckboxChange}
                    />
                    {diet.substring(0, 1).toUpperCase() +
                      diet.substring(1, diet.length)}
                  </label>
                </li>
              ))}
            </div>
            <button
              type="submit"
              disabled={
                !input.title ||
                !input.image ||
                !input.description ||
                !input.healthScore ||
                input.diets.length === 0
              }
            >
              Create Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
