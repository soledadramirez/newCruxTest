import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Create from "./Create";
import Activity from "./Activity";
import PhotoSession from "./PhotoSession";

const SidebarExample: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Botón para abrir el Sidebar */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Sidebar */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          ModalProps={{
            keepMounted: true, // Mejora el rendimiento en móviles
          }}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {[
                { text: "Inicio", path: "/" },
                { text: "Crear", path: "/crear" },
                { text: "Sesión de fotos", path: "/sesion" },
                { text: "Actividad", path: "/actividad" },
                { text: "Salir", path: "/salir" },
              ].map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.path}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Contenido Principal */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crear" element={<Create/>} />
            <Route path="/sesion" element={<PhotoSession />} />
            <Route path="/actividad" element={<Activity/>} />
            <Route path="/salir" element={<Salir />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

// Componentes de página simulados
const Home: React.FC = () => (
  <>
    <h1>Bienvenido a NewCrux.</h1>
    <h2>Comenzamos?</h2>
  </>
);

const Salir: React.FC = () => <h1>Gracias por usar NewCrux. Hasta pronto.</h1>;

export default SidebarExample;
