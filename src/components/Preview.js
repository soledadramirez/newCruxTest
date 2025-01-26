import React from "react";
import profile from "../assets/profile.webp";
import Toast from "./Publish";

const Preview = ({ preview }) => {
  return (
    <div className="bg-white p-4 shadow-sm w-100 w-md-50">
      <h1 className="text-center mb-4">Vista previa del Post</h1>
      {preview ? (
        <div>
          <div className="linkedin-post bg-light p-2 rounded">
            {JSON.stringify(preview, null, 2)}
            <div className="d-flex align-items-center mb-3">
              <img
                src={preview.profilePicture || profile}
                alt="Foto de perfil"
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px" }}
              />
              <div>
                <strong>{preview.name || "Nombre del usuario"}</strong>
                <p className="mb-0 text-muted">{preview.title || "Título profesional"}</p>
                <span className="text-muted" style={{ fontSize: "12px" }}>
                  {preview.date || "Hace unos momentos"} · {preview.visibility || "Público"}
                </span>
              </div>
            </div>

            {/* Cuerpo del post */}
            <div className="post-body mb-3">
              <p style={{ fontSize: "15px", color: "#333" }}>
                {preview.text || "Aquí verás el texto de tu post generado."}
              </p>
            </div>

            {/* Contador de interacciones */}
            <div
              className="post-stats mb-3 d-flex justify-content-between text-muted"
              style={{ fontSize: "14px" }}
            >
              <span>
                👍 {preview.likes || 120} · 💬 {preview.comments || 45} · 🔗{" "}
                {preview.shares || 10}
              </span>
              <span>{preview.views || 2300} visualizaciones</span>
            </div>

            {/* Acciones del post */}
            <div className="post-actions d-flex justify-content-around border-top pt-1">
              <button
                className="btn btn-light w-25 d-flex align-items-center justify-content-center p-0"
                style={{ fontSize: "13px" }}
              >
                👍 Recomendar
              </button>
              <button
                className="btn btn-light w-25 d-flex align-items-center justify-content-center"
                style={{ fontSize: "13px" }}
              >
                💬 Comentar
              </button>
              <button
                className="btn btn-light w-25 d-flex align-items-center justify-content-center"
                style={{ fontSize: "13px" }}
              >
                🔗 Compartir
              </button>
            </div>
          </div>

          {/* Componente de Toasts */}
          <Toast />
        </div>
      ) : (
        <p className="text-center text-muted">Aquí verás tu post generado por IA</p>
      )}
    </div>
  );
};

export default Preview;
