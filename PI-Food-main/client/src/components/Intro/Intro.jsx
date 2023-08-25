import style from "./Intro.module.css";

function Intro() {
  return (
    <div className={style.upperContainer}>
      <div className={style.leftContainer}>
        <h2>Fun and Easy, to become a Master Cook</h2>
        <p>
          Explore our selection of irresistible recipes. From comforting
          classics to bold dishes, our detailed instructions and expert tips
          will guide you in your culinary adventure. Discover the joy of cooking
          and creating unforgettable moments around the table.
        </p>
      </div>
      <div className={style.rightContainer}>
        <img
          src="https://images.healthshots.com/healthshots/en/uploads/2023/01/12145340/cooking.jpg"
          alt="cooking"
        />
      </div>
    </div>
  );
}

export default Intro;
