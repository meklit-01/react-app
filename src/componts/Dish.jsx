import { memo, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "./Card";
import Modal from "../ui/Modal";
import { useCartStore } from "../store/cartStore";

function Dish({ dish }) {
  const [showModal, setShowModal] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <>
      <Card>
        <div className="dish-card">
         <img src={`${import.meta.env.BASE_URL}${dish.image}`}
            alt={dish.name}
         />
          <div className="discribtion">
            <h3>{dish.name}</h3>
            <p className="category">{dish.category}</p>
             {dish.spicy && <span className="spicy">Spicy</span>}

          <h4>{dish.price} ETB</h4>
          </div>

          <div className="dish-actions">
            <Link to={`/menu/${dish.id}`} className="details-button">
              View Details
            </Link>
            <button onClick={() => addItem(dish)} className="add-button">
              Add
            </button>
          </div>
        </div>
      </Card>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 id="dish-modal-title">{dish.name}</h2>
          <p>Category: {dish.category}</p>
          <p>{dish.description}</p>
          <h3>{dish.price} ETB</h3>

          {dish.spicy && <p className="spicy">Spicy</p>}

          <button
            onClick={() => {
              addItem(dish);
              setShowModal(false);
            }}
            className="add-button"
          >
            Add to Cart
          </button>
        </Modal>
      )}
    </>
  );
}

Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    spicy: PropTypes.bool,
    description: PropTypes.string,
  }).isRequired,
};

export default memo(Dish);
