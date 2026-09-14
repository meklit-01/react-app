import { Link, useLocation } from "react-router-dom";

function Receipt() {
  const location = useLocation();
  const total = location.state?.total || 0;

  return (
    <section className="receipt">
      <h2>Order Complete!</h2>
      <p>Thank you for ordering from Addis Eats.</p>
      <h3>Total: {total} ETB</h3>

      <Link to="/menu" className="primary-button">
        Back to Menu
      </Link>
    </section>
  );
}

export default Receipt;
