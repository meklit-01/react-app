import { Link } from "react-router-dom";
import image from "/images/homePage.png"

function Home() {
  return (
    <section className="home">
      <img src={image} alt="" />
      <h2>Welcome to Addis Eats</h2>
      <p>
        Discover delicious Ethiopian food made with traditional flavors.
      </p>

      <Link to="/menu" className="primary-button">
        Explore Menu
      </Link>
    </section>
  );
}

export default Home;
