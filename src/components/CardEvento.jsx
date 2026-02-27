// Importa React e recursos de navegação do React Router
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Componente que representa o card de um evento
export default function CardEvento({ evento, onRemover }) {

  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // Função para ir para a tela de edição
  function editarEvento() {
    navigate("/cadastrar", {
      state: { eventoParaEditar: evento } // Envia o evento para edição
    });
  }

  return (
    <article 
      className="card"
      style={{ 
        position: "relative", // Permite posicionar elementos absolutos dentro do card
        padding: "1.5rem",
        borderRadius: "12px"
      }}
    >

      {/* Selo de status (Aberto ou Lotado) */}
      <span
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: "0.75rem",
          backgroundColor: evento.status === "lotado" ? "#dc3545" : "#28a745",
          color: "#fff",
          padding: "0.2rem 0.6rem",
          borderRadius: "20px",
          fontWeight: "bold"
        }}
      >
        {evento.status === "lotado" ? "Lotado" : "Aberto"}
      </span>

      {/* Selo indicando que o evento foi editado */}
      {evento.editado && (
        <span
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "0.75rem",
            backgroundColor: "#ffc107",
            color: "#000",
            padding: "0.2rem 0.5rem",
            borderRadius: "4px",
            fontWeight: "bold"
          }}
        >
          ✏️ Editado
        </span>
      )}

      {/* Informações principais do evento */}
      <div>
        <h3>{evento.titulo}</h3>

        {/* Data e local do evento */}
        <p className="muted">
          {evento.data} • {evento.local}
        </p>

        {/* Descrição do evento */}
        <h4>{evento.descricao}</h4>
      </div>

      {/* Área dos botões de ação */}
      <div 
        style={{ 
          display: "flex", 
          gap: "0.5rem", 
          marginTop: "1rem",
          flexWrap: "wrap"
        }}
      >
        {/* Link para página de detalhes */}
        <Link
          to={`/eventos/${evento.id}`}
          className="btn"
          style={{ textDecoration: "none" }}
        >
          Ver Detalhes
        </Link>

        {/* Botão para editar */}
        <button
          className="btn"
          onClick={editarEvento}
          style={{
            backgroundColor: "#ffc107",
            color: "#000",
            border: "none"
          }}
        >
          Editar
        </button>

        {/* Botão para remover o evento */}
        <button
          className="btn danger"
          onClick={() => onRemover(evento.id)}
        >
          Remover
        </button>
      </div>

    </article>
  );
}