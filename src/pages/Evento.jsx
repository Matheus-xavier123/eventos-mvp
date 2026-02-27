import React, { useState } from "react";
import CardEvento from "../components/CardEvento";

// Componente responsável por listar os eventos
export default function Evento({ eventos, onRemover, onRemoverTodos }) {
  
  const [filtro, setFiltro] = useState("");
  const [filtroLocal, setLocal] = useState("");

  const eventosFiltrados = eventos
    .filter(evento => 
      evento.titulo.toLowerCase().includes(filtro.toLowerCase())
    )
    .filter(evento => 
      evento.local.toLowerCase().includes(filtroLocal.toLowerCase())
    );

  return (
    <section className="stack">
      
      <h2>Eventos</h2>
      
      <input 
        style={{width:"47%"}} 
        type="text" 
        onChange={(e) => setFiltro(e.target.value)} 
        value={filtro} 
        placeholder="Filtre eventos por título aqui" 
      />
      
      <input 
        style={{width:"47%"}} 
        type="text" 
        onChange={(e) => setLocal(e.target.value)} 
        value={filtroLocal} 
        placeholder="Filtre eventos por local aqui" 
      />

      <button 
        style={{width:"50%"}} 
        type="button" 
        className="btn danger"
        onClick={onRemoverTodos}
      >
        Remover Todos os Eventos
      </button>

      {eventos.length === 0 ? (
        <p className="muted">
          Nenhum evento cadastrado. Vá em “Cadastrar”.
        </p>
      ) : (
        <div className="grid">
          {eventosFiltrados.map((e) => (
            <div 
              key={e.id} 
              className="card"
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}
            >

              {/* IMAGEM DO EVENTO */}
              {e.fotos && e.fotos.length > 0 && (
                <img
                  src={e.fotos[0]}
                  alt={e.titulo}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              )}

              <div style={{ padding: "15px" }}>

                {/* Componente original */}
                <CardEvento 
                  evento={e}
                  onRemover={onRemover}
                />

                {/* Informações extras */}
                <div 
                  className="extra-info"
                  style={{
                    wordBreak: "break-word"
                  }}
                >

                  {e.capacidadeTotal && (
                    <p><strong>Capacidade:</strong> {e.capacidadeTotal}</p>
                  )}

                  {e.mapaURL && (
                    <p>
                      <strong>Mapa:</strong>{" "}
                      <a 
                        href={e.mapaURL} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ wordBreak: "break-all" }}
                      >
                        Ver Localização
                      </a>
                    </p>
                  )}

                </div>

              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
}