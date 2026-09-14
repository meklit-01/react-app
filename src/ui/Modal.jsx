import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;

    const modal = modalRef.current;
    const focusableSelector =
      "button, a[href], input, textarea, select, [tabindex]:not([tabindex='-1'])";
    const focusable = modal?.querySelectorAll(focusableSelector) || [];

    if (focusable.length > 0) {
      focusable[0].focus();
    }

    function handleKeyDown(event) {
      // Exercise 7: Escape closes the modal.
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Exercise 7: keep Tab focus inside the modal.
      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Exercise 7: return focus to the element that opened the modal.
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-overlay" role="presentation">
      <div
        className="modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
      >
        {children}

        <button onClick={onClose} className="modal-close">
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
