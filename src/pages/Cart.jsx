import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );
  const remove = useCartStore((state) => state.remove);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/menu" className="primary-button">
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2>Your Cart</h2>

      <div className="cart-list">
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <div>
              <h3>{item.name}</h3>
              <p>{item.price} ETB × {item.quantity}</p>
            </div>

            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.id)}>
                -
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => increaseQuantity(item.id)}>
                +
              </button>
            </div>

            <p>{item.price * item.quantity} ETB</p>

            <button
              onClick={() => remove(item.id)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h3>Total: {total} ETB</h3>

        <Link to="/checkout" className="primary-button">
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}

export default Cart;
