import React, { useState } from "react";

const ToastWithButtons = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleButtonClick = (action) => {
    if (action === "programar") {
      setToastMessage("¡Tu publicación ha sido programada con éxito!");
    } else if (action === "publicar") {
      setToastMessage("¡Tu publicación ha sido publicada con éxito!");
    }
    setShowToast(true); // Muestra el toast
  };

  return (
    <div className="container mt-3 buttons">
      <div className="d-flex flex-direction-row justify-content-between w-100 gap-4 p-3">
        <button
          type="button"
          className="btn btn-primary w-50"
          onClick={() => handleButtonClick("programar")}
        >
          Programar
        </button>
        <button
          type="button"
          className="btn btn-primary w-50"
          onClick={() => handleButtonClick("publicar")}
        >
          Publicar
        </button>
      </div>

      {/* Toast Notification */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 1055 }}
      >
        <div
          className={`toast align-items-center text-bg-light ${
            showToast ? "show" : ""
          }`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              onClick={() => setShowToast(false)}
              aria-label="Cerrar"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastWithButtons;
