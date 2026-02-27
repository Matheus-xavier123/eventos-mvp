// Importa React e NavLink para navegação com destaque de rota ativa
import React from "react";
import { NavLink } from "react-router-dom";

// Componente Menu
export default function Menu() {
  return (
    <div className="icones">
      
      {/* Barra de navegação */}
      <nav className="menu">

        {/* Link para a página Home */}
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          {/* Ícone da Home */}
          <span className="material-symbols-outlined">Home</span>
        </NavLink>

        {/* Link para a página de Eventos */}
        <NavLink 
          to="/evento" 
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          {/* Ícone de Evento */}
          <span className="material-symbols-outlined">Event</span>
        </NavLink>

        {/* Link para a página de Cadastro */}
        <NavLink 
          to="/cadastrar" 
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          {/* Ícone de adicionar evento */}
          <span className="material-symbols-outlined">Calendar_add_on</span>
        </NavLink>

      </nav>
    </div>
  );
}