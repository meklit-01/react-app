import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RequireAuth from "./RequireAuth";
import ErrorBoundary from "./ErrorBoundary";

// Exercise 3: checkout and receipt are loaded only when their routes are opened.
const Checkout = lazy(() => import("./pages/ChakOut"));
const Receipt = lazy(() => import("./pages/Receipt"));

function Skeleton() {
  return (
    <section className="skeleton" aria-live="polite">
      <div className="skeleton-line" />
      <div className="skeleton-line short" />
      <p>Loading page...</p>
    </section>
  );
}

function MenuUnavailable() {
  return (
    <section className="error-box" role="alert">
      <h2>Menu unavailable</h2>
      <p>Something went wrong while showing the menu.</p>
      <button onClick={() => window.location.reload()}>
        Try Again
      </button>
    </section>
  );
}

function CartUnavailable() {
  return (
    <section className="error-box" role="alert">
      <h2>Cart unavailable</h2>
      <p>Something went wrong with the cart.</p>
      <a href="/menu" className="primary-button">
        Browse Menu
      </a>
    </section>
  );
}

function CheckoutUnavailable() {
  return (
    <section className="error-box" role="alert">
      <h2>Checkout unavailable</h2>
      <p>The checkout page could not be loaded.</p>
      <a href="/cart" className="primary-button">
        Back to Cart
      </a>
    </section>
  );
}

function ReceiptUnavailable() {
  return (
    <section className="error-box" role="alert">
      <h2>Receipt unavailable</h2>
      <p>The receipt page could not be loaded.</p>
      <a href="/menu" className="primary-button">
        Back to Menu
      </a>
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* Exercise 1: Menu has its own error boundary. */}
        <Route
          path="menu"
          element={
            <ErrorBoundary fallback={<MenuUnavailable />}>
              <Menu />
            </ErrorBoundary>
          }
        />

        <Route path="menu/:id" element={<DishDetail />} />

        {/* Exercise 1: Cart has a separate error boundary. */}
        <Route
          path="cart"
          element={
            <ErrorBoundary fallback={<CartUnavailable />}>
              <Cart />
            </ErrorBoundary>
          }
        />

        <Route path="login" element={<Login />} />

        {/* Exercises 3 + 4 + 5: lazy route, Suspense skeleton, chunk-error boundary. */}
        <Route
          path="checkout"
          element={
            <RequireAuth>
              <ErrorBoundary fallback={<CheckoutUnavailable />}>
                <Suspense fallback={<Skeleton />}>
                  <Checkout />
                </Suspense>
              </ErrorBoundary>
            </RequireAuth>
          }
        />

        <Route
          path="receipt"
          element={
            <ErrorBoundary fallback={<ReceiptUnavailable />}>
              <Suspense fallback={<Skeleton />}>
                <Receipt />
              </Suspense>
            </ErrorBoundary>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
