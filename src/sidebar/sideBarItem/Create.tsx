import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import LinkedinView from "../../pages/create/components/preview/linkedin/LinkedinView";
import CreateForm from "../../pages/create/CreateForm";

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
  file: File | null;
}
const App = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Array<PreviewResponse>>([]);
  const isComponentMounted = useRef(true); // Usamos useRef para mantener el estado del montaje
  const wsRef = useRef<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>();
  const [user, setUser] = useState<{ id: string;}>({id: ''});

  useEffect(() => {
    isComponentMounted.current = true; // Marcamos como montado al inicio

    const connectWebSocket = () => {
      const socket = new WebSocket("ws://web-socket-new-crux-65238b9f49d2.herokuapp.com");

      socket.onopen = () => {
        console.log("Conectado al WebSocket");
      };

      socket.onmessage = (event) => {
        if (!isComponentMounted.current) return; // Evita actualizar estado si el componente está desmontado
        const response = JSON.parse(event.data);
       if (response.files && response.files.length > 0) {
         const fileArrayUnit = new Uint8Array(response.files[0].file_buffer.data);
        const fileBlob= new Blob([fileArrayUnit], { type: response.files[0].mime_type});  //   // Crear la URL ara el Blob
        const fileUrl = URL.createObjectURL(fileBlob);
        setFileUrl(fileUrl);
        } else {
          setFileUrl(undefined);
        }
        console.log("Mensaje del servidor WebSocket:", response);
        setPreview(response.data);
        setIsLoading(false);
      };

      socket.onclose = () => {
        if (!isComponentMounted.current) return; // Evita reconectar si el componente está desmontado
        console.error("Conexión WebSocket cerrada. Reintentando...");
        setTimeout(() => connectWebSocket(), 5000); // Reintentar después de 5 segundos
      };

      socket.onerror = (error) => {
        console.error("Error en el WebSocket:", error);
        socket.close(); // Cierra la conexión para evitar errores repetidos
      };

      wsRef.current = socket; // Guardamos la referencia del WebSocket
    };

    connectWebSocket();

    return () => {
      isComponentMounted.current = false; // Marcamos como desmontado
      if (wsRef.current) {
        wsRef.current?.close(); // Cerramos la conexión al desmontar
      }
    };
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('event.origin', event.origin);
      if (event.origin !== 'https://web-socket-new-crux-65238b9f49d2.herokuapp.com') return;
      if(event.data?.data) {
        console.log('Datos recibidos:', event.data?.data);
        setUser({id: event.data?.data?.id});
      }
      
    // Guarda en estado
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true)
    setPreview([]);
    const formData = new FormData();
    formData.append("text", text);
    formData.append("url", url);
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.post("https://hook.us2.make.com/lka1ovvuarl7i3pm2gmuiwz455mumkuf", formData);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  const handleLinkedInLogin = () => {
    const linkedInAuthUrl = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=773asu10mw5lfd&redirect_uri=https://web-socket-new-crux-65238b9f49d2.herokuapp.com/linkedin/callback&scope=w_member_social profile openid email';
    // Abrimos LinkedIn en un popup
    const width = 600, height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    window.open(
      linkedInAuthUrl,
      "LinkedIn Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  }

  return (
      <div className="min-vh-100 w-100">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 w-100 m-auto" style={{ height: 670}}>
        <button onClick={handleLinkedInLogin}>{user?.id ? 'Logueado'  : 'Login with Linkedin '}</button>
        <CreateForm
          text={text}
          setText={setText}
          url={url}
          setUrl={setUrl}
          file={file}
          setFile={setFile}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          setIsLoading= {setIsLoading}
        />
        {
         preview?.length === 0 ? <LinkedinView  userId={user?.id}  preview={{
          social_media: 'linkedin',
          text: '',
          hash_tag: '',
          profilePicture: '',
          file: null,
         }} /> :  preview?.map((item, index) => {
            //Mejorar esto para el manejo de imagenes de mak
            item.file = file;
            return (
              <LinkedinView fileUrl={fileUrl}  userId={user?.id}  key={index} preview={item} />
            )
          }
          )
        }
      </div>
    </div>
  );
};

export default App;
