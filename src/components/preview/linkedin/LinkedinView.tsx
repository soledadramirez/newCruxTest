import React from "react";
import PublishButton from "../../Publish";
import ProgramButton from "../../Program";
import profile from "../../../assets/profile.webp";
import { PreviewResponse } from "../../../App";




const Preview = ({ preview }:{preview: PreviewResponse}) => {

  return (
    <div className="bg-light p-4 shadow-sm w-100 w-md-50">
      <h2 className="text-center mb-4">Vista previa del Post</h2>
      {preview ? (
        <div>
          <div className="linkedin-post  p-2 rounded" style={{ backgroundColor: "#fff", maxHeight: '500px', overflowY: "auto"}}>
            <div className="d-flex align-items-center mb-3">
              <img
                src={preview.profilePicture || profile}
                alt="Foto de perfil"
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px" }}
              />
              <div>
                <strong>{preview.name || "New Crux"}</strong>
                <p className="mb-0 text-muted">{preview.title || "Emprendedor"}</p>
                <span className="text-muted" style={{ fontSize: "12px" }}>
                  {preview.date || "Hace unos momentos"} · {preview.visibility || "Público"}
                </span>
              </div>
            </div>

            {/* Cuerpo del post */}
            <div className="post-body mb-3">
              <p style={{ fontSize: "15px", color: "#333"}}>
                {preview.text || "Aquí verás tu post generado."}
              </p>
              <p style={{ fontSize: "15px", color: "#333" }}>
                {preview.hash_tag}
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
          <div className="d-flex flex-direction-row justify-content-evenly w-100">
            <PublishButton preview={preview} />
            <ProgramButton preview={preview} />
          </div>

        </div>
      ) : (
        <p className="text-center text-muted">Aquí verás tu post generado por IA</p>
      )}
    </div>
  );
};

export default Preview;
