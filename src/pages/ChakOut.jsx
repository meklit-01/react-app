import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function Checkout() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleSubmit(event) {
    event.preventDefault();

    navigate("/receipt", {
      state: { total },
    });

    clear();
  }

  if (items.length === 0) {
    return (
      <section>
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="form-container">
      <h2>Checkout</h2>

      <p>
        Order total: <strong>{total} ETB</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label>
          Phone
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+251..."
            required
          />
        </label>

        <label>
          Area
          <input
            type="text"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            required
          />
        </label>

        <button type="submit" className="primary-button" id="order">
          Order
        </button>
      </form>
    </section>
  );
}

export default Checkout;
