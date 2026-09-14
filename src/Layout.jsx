import { Link, NavLink, Outlet } from "react-router-dom";
import { useCartStore } from "./store/cartStore";
import { useTheme } from "./hooks/useTheme";

function Layout() {
  const items = useCartStore((state) => state.items);
  const { theme, toggleTheme } = useTheme();

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className={theme}>
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            Addis Eats
          </Link>

          <nav className="nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Menu
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Cart ({cartCount})
            </NavLink>

            <NavLink
              to="/checkout"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Checkout
            </NavLink>

            <button onClick={toggleTheme} className="theme-button">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats</p>
      </footer>
    </div>
  );
}

export default Layout;
