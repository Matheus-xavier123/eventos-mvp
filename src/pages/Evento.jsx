import React, { useState } from "react";
import CardEvento from "../components/CardEvento";

export default function Evento({ eventos, onRemover }) {

  const [filtro, setFiltro] = useState("");
  const [filtroLocal, setLocal] = useState("");

  const eventosFiltrados = eventos
    .filter(evento => evento.titulo.toLowerCase().includes(filtro.toLowerCase()))
    .filter(evento => evento.local.toLowerCase().includes(filtroLocal.toLowerCase()));
    
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

      {eventos.length === 0 ? (
        <p className="muted">Nenhum evento cadastrado. Vá em “Cadastrar”.</p>
      ) : (
        <div className="grid">
          {eventosFiltrados.map((e) => (
            <CardEvento key={e.id} evento={e} onRemover={onRemover} />
          ))}
        </div>
      )}
    </section>
  );
}