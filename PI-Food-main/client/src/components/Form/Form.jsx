import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../../redux/actions/actions";
import BasicNavBar from "../BasicNavBar/BasicNavBar";
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

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrors(validate({ ...input, [event.target.name]: event.target.value }));
  };

  const handleStepByStep = (event) => {
    setInput({
      ...input,
      stepByStep: event.target.value.split("-"),
    });
  };

  const handleSelect = (event) => {
    setInput({
      ...input,
      diets: [...input.diets, event.target.value],
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(input);

    const { data } = await axios.post("http://localhost:3001/recipes", input);
    console.log(data);
    history.push("/home");
  };

  return (
    <div>
      <BasicNavBar />
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
            <div>
              <label>Diets</label>
              <select
                className={style.selectBox}
                name="diets"
                size="10"
                onChange={handleSelect}
                multiple
              >
                {diets?.map((diet, index) => (
                  <option key={index}>{diet}</option>
                ))}
              </select>
              <p className={style.error}>{errors.e5}</p>
            </div>
            <button type="submit">Create Recipe</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
