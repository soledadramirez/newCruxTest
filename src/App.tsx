import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import background from './assets/fondo.webp';
import Sidebar from "./sidebar/Sidebar";

const App = () => {

  return (
    // <div className="min-vh-100 d-flex justify-content-center align-items-center"
      <div className="min-vh-100 d-flex flex-md-column justify-content-center align-items-center "
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: '100%',
        margin: 'auto'
      }}>
      <Sidebar />
      </div>
  );
};

export default App;
