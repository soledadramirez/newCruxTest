import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import background from './assets/fondo.webp';
import axios from "axios";
import InputForm from "../src/components/InputForm";
import Preview from "../src/components/Preview";

const App = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://de56-2a09-bac1-680-2370-00-2c-f9.ngrok-free.app");

    ws.onopen = () => {
      console.log("Conectado al WebSocket");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensaje del servidor WebSocket:", data);
      /**
       *[{social_data: 'Instagram', text: 'Es una masa', hash_tag: '#sefiroe'},
         {social_data: 'Linkedin', text: 'Es una papa', hash_tag: '#sef'}
       * ] 
       * 
       */
      setPreview(data.message);
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
        minHeight: "100vh"
      }}>
      <div className="d-flex flex-column flex-md-row justify-content-between" style={{ maxWidth: '1000px', width: '100%' }}>
        <InputForm
          text={text}
          setText={setText}
          url={url}
          setUrl={setUrl}
          file={file}
          setFile={setFile}
          handleSubmit={handleSubmit}
        />
        <Preview preview={preview} />
      </div>
    </div>
  );
};

export default App;
