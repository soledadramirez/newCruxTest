import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import background from './assets/fondo.webp';
import axios from "axios";

const App = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://de56-2a09-bac1-680-2370-00-2c-f9.ngrok-free.app"); // Cambia por tu URL de ngrok

    ws.onopen = () => {
      console.log("Conectado al WebSocket");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensaje del servidor WebSocket:", data);
      setPreview(data.message)
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPreview('');
    const formData = new FormData();
    formData.append("text", text);
    formData.append("url", url);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post("https://hook.us2.make.com/vg2o3t9ltk3ly21a4whaen1g9rckoukc", {
        text,
        url,
        
      });
      setPreview(response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setPreview({ error: "Ocurrió un error inesperado." });
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" 
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}>
      <div className="d-flex flex-row gap-4" style={{ maxWidth: '850px', width: '100%' }}>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow-sm w-100"
          style={{ maxWidth: '400px' }}
        >
          <h1 className="text-center mb-4">NewCrux</h1>

          <div className="mb-3">
            <label htmlFor="text" className="form-label">Agregá texto:</label>
            <input
              type="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="url" className="form-label">Agregá una URL:</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="file" className="form-label">Agregá un archivo:</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="form-control"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Enviar
          </button>
        </form>

        <div className="bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: '400px' }}>
          <h1 className="text-center mb-4">Vista previa del Post</h1>
          {preview ? (
            <pre className="bg-light p-3 rounded" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {JSON.stringify(preview, null, 2)}
            </pre>
          ) : (
            <p className="text-center text-muted">Aquí verás tu post generado por IA</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
