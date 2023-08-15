import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./BasicNavBar.module.css";

function BasicNavBar() {
  return (
    <div className={style.navBarContainer}>
      <Link to="/home">
        <h1>The Recipe Book</h1>
      </Link>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}

export default BasicNavBar;
