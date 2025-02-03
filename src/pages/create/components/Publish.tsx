import React, { useState } from "react";
import axios from "axios";
import { PreviewResponse } from "../../../sidebar/sideBarItem/Create";

const PublishButton = ({preview, userId }: {preview: PreviewResponse, userId: string}) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const onPublish = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", preview.text);
    formData.append("user_id", userId);
    if (preview.file) {
      formData.append("files", preview.file);
    }
    console.log('REQUEST___', {userId});
    try {
     await axios.post("https://web-socket-new-crux-65238b9f49d2.herokuapp.com/linkedin/post", formData);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  
  const handleButtonClick = async (e: any, action: string) => {
    if (action === "programar") {
      setToastMessage("¡Tu publicación ha sido programada con éxito!");
    } else if (action === "publicar") {
      await onPublish(e);
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
