import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function DishDetail() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchDish() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${import.meta.env.BASE_URL}dishes.json`);

        if (!response.ok) {
          throw new Error("Failed to load dishes");
        }

        const data = await response.json();

        const foundDish = data.find(
          (item) => String(item.id) === id
        );

        setDish(foundDish || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDish();
  }, [id]);

  if (loading) return <p>Loading dish...</p>;

  if (error) return <p className="error">{error}</p>;

  if (!dish) {
    return (
      <section>
        <h2>Dish not found</h2>
        <p>Sorry, we could not find that dish.</p>
        <Link to="/menu" className="primary-button">
          Back to Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="dish-detail">
     <img src={`${import.meta.env.BASE_URL}${dish.image}`}
            alt={dish.name}
         />
      <h2>{dish.name}</h2>
      <p className="category">Category: {dish.category}</p>
      <p>{dish.description}</p>

      {dish.spicy && <span className="spicy">Spicy</span>}

      <h3>{dish.price} ETB</h3>

      <button onClick={() => addItem(dish)} className="add-button">
        Add to Cart
      </button>

      <br />

      <Link to="/menu"  className="primary-button">
        ← Back to Menu
      </Link>
    </section>
  );
}

export default DishDetail;
