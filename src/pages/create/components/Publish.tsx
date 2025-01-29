import React, { useState } from "react";
import axios from "axios";
import { PreviewResponse } from "../../../sidebar/sideBarItem/Create";

const PublishButton = ({preview}: {preview: PreviewResponse}) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://hook.us2.make.com/fcu763oi9tm4e1ln4vhdk9hhoyv0y4qv", {
        text: preview.text,
        url: preview.hash_tag,
      });
      console.log('response', response);
      console.log('response.data', response.data);
      console.log('response.config.data', response.config.data);

      //setPreview(response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al enviar los datos");
    }
  };
  
  const handleButtonClick = (e: any, action: string) => {
    if (action === "programar") {
      setToastMessage("¡Tu publicación ha sido programada con éxito!");
    } else if (action === "publicar") {
      handleSubmit(e);
      setToastMessage("¡Tu publicación ha sido publicada con éxito!");
    }
    setShowToast(true); // Muestra el toast
  };

  return (
    <div className="container mt-3 buttons">
      <div className="d-flex flex-direction-row justify-content-between w-100 p-3">
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={(e) => handleButtonClick(e,"publicar")}
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

export default PublishButton;
