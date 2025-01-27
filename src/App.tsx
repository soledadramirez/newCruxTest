import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import background from './assets/fondo.webp';
import axios from "axios";
import InputForm from "../src/components/InputForm";
import Preview from "./components/preview/linkedin/LinkedinView";

export interface PreviewResponse {
  social_media: string;
  text: string;
  hash_tag: string;
  profilePicture?: string; 
  title?: string;
  date?: string;
  visibility?: boolean;
  name?: string;
  likes?: [];
  shares?: [];
  views?:[];
  comments?: [];
}
const App = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Array<PreviewResponse>>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://9686-2a09-bac1-680-2370-00-2c-e6.ngrok-free.app");

    ws.onopen = () => {
      console.log("Conectado al WebSocket");
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("Mensaje del servidor WebSocket:", response);
      /**
       *[{social_data: 'Instagram', text: 'Es una masa', hash_tag: '#sefiroe'},
         {social_data: 'Linkedin', text: 'Es una papa', hash_tag: '#sef'}
       * ] 
       * 
       */
      setPreview(response.data);
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPreview([]);
    const formData = new FormData();
    formData.append("text", text);
    formData.append("url", url);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post("https://hook.us2.make.com/itr5w20uh1fxwlq1odpgv36d1x5k7cot", {
        text,
        url,
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

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}>
      <div className="d-flex flex-column flex-md-row justify-content-between gap-4" style={{ height: 670,maxWidth: '1000px', width: '100%' }}>
        <InputForm
          text={text}
          setText={setText}
          url={url}
          setUrl={setUrl}
          file={file}
          setFile={setFile}
          handleSubmit={handleSubmit}
        />
        {
         preview?.length === 0 ? <Preview   preview={{
          social_media: '',
          text: '',
          hash_tag: '',
          profilePicture: '',
         }} /> :  preview?.map((item, index) => {
            return (
              <Preview  key={index} preview={item} />
            )
          }
          )
        }
      </div>
    </div>
  );
};

export default App;
