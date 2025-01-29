import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Create from "./Create";
import PhotoSession from "./PhotoSession";
import Activity from "./Activity";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation(); // Hook para detectar cambios de ruta
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  // Lista de rutas y sus respectivos componentes
  const menuItems = [
    { path: "/", label: "🏠 Home", component: <div><h1>Bienvenidos a NewCrux</h1></div> },
    { path: "/Create", label: "✏️ Crear", component: <div><Create /></div> },
    { path: "/PhotoSession", label: "📷 Sesión de fotos", component: <div><PhotoSession /></div> },
    { path: "/Activity", label: "📊 Actividad", component: <div><Activity /></div> },
  ];
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cerrar el sidebar cuando la ruta cambie
  useEffect(() => {
    setIsExpanded(false);
  }, [location.pathname]); // Se ejecuta cada vez que cambia la ruta

  // Detectar clics fuera del sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false); // Colapsar el sidebar si se hace clic fuera
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        style={{
          width: isExpanded ? "250px" : "50px",
          overflowX: "hidden",
          height: "100vh",
          transition: "width 0.3s",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          cursor: "pointer",
          backgroundColor: isMobile && !isExpanded? "transparent":"rgb(248,248,248)",
          boxShadow: isExpanded ? "4px 0 10px rgba(0,0,0,0.3)" : "none",
          flexDirection: "column",
          alignItems: isExpanded ? "start" : "center",
          paddingTop: "10px",
        }}
        onClick={() => setIsExpanded(true)}
      >
        {/* Ícono de menú (solo visible cuando está colapsado) */}
        {!isExpanded && (
          <div style={{ fontSize: "24px", marginBottom: "10px", textAlign: 'center' }}>☰</div>
        )}


        {isExpanded && (
          <ul className="nav flex-column p-2" style={{ width: "100%" }}>
            {menuItems.map((item) => (
              <li className="nav-item pt-4" key={item.path}>
                <Link to={item.path} className="nav-link text-dark">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Overlay (oscurece el fondo cuando el sidebar está abierto) */}
      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          padding: "10px",
          width: "100%",
        }}
      >
        <Routes>
          {menuItems.map((item) => (
            <Route key={item.path} path={item.path} element={item.component} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Sidebar />
    </Router>
  );
};

export default App;
