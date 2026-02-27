// Importa o React
import React from "react";

// Componente Header (cabeçalho da aplicação)
export default function Header() {
  return (
    <header className="header">
      
      {/* Título principal da aplicação */}
      <h1 style={{ textAlign: "center" }}> Gerenciador de Eventos </h1>
      
      {/* Subtítulo explicando as tecnologias usadas */}
      <p className="sub" style={{ textAlign: "center" }}> React JSX + Rotas + Props + State </p>
    </header>
  );
}