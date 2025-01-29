import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import background from './assets/fondo.webp';
import Sidebar from "./components/Sidebar";

const App = () => {

  return (
    // <div className="min-vh-100 d-flex justify-content-center align-items-center"
      <div className="min-vh-100 d-flex flex-direction-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "1200px"
      }}>
      <Sidebar />
      </div>
  );
};

export default App;
