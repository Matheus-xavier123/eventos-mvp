// Importa hooks do React e funções de navegação do React Router
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Componente de cadastro/edição de evento
export default function CadastroEvento({ onAdd, onEdit }) {

  // Hook para navegar entre páginas
  const navigate = useNavigate();

  // Hook para acessar dados enviados pela navegação
  const location = useLocation();

  // Recebe o evento caso esteja editando
  const eventoParaEditar = location.state?.eventoParaEditar;

  // Estados para armazenar os dados do formulário
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("aberto"); 

  // novos States
  const [capacidadeTotal, setcapacidadeTotal] = useState("");
  const [mapaURL, setmapaURL] = useState("");
  const [fotoTexto, setfotoTexto] = useState("");

  // Quando existir um evento para editar, preenche os campos
  useEffect(() => {
    if (eventoParaEditar) {
      setTitulo(eventoParaEditar.titulo);
      setData(eventoParaEditar.data);
      setLocal(eventoParaEditar.local);
      setDescricao(eventoParaEditar.descricao || "");
      setStatus(eventoParaEditar.status || "aberto"); 

      setcapacidadeTotal(eventoParaEditar.capacidadeTotal || "");
      setmapaURL(eventoParaEditar.mapaURL || "");
      setfotoTexto(
        eventoParaEditar.fotos
        ? eventoParaEditar.fotos.join("\n")
        : ""
      );
    }
  }, [eventoParaEditar]);

  // Função chamada ao enviar o formulário
  function handleSubmit(e) {
    e.preventDefault(); // Evita recarregar a página

    // Verifica se todos os campos foram preenchidos
    if (!titulo || !data || !local || !descricao) {
      alert("Preencha todos os campos");
      return;
    }

    const fotosArray = fotoTexto
    .split("\n")
    .map((foto) => foto.trim())
    .filter((foto) => foto !== "");

    // Garante que capacidadeTotal é número
    const capacidade = Number(capacidadeTotal);

    if (eventoParaEditar) {
      onEdit({
        ...eventoParaEditar,
        titulo,
        data,
        local,
        descricao,
        status,
        capacidadeTotal: capacidade,
        vagasRestantes: eventoParaEditar.vagasRestantes ?? capacidade,
        mapaURL,
        fotos: fotosArray,  
        editado: true
      });
    } else {
      // Se for novo evento, chama a função onAdd
      onAdd({
        titulo,
        data,
        local,
        descricao,
        status,
        capacidadeTotal: capacidade,
        vagasRestantes: capacidade,
        mapaURL,
        fotos: fotosArray,
        editado: false
      });
    }

    // Após salvar ou editar, volta para a página de eventos
    navigate("/evento");
  }
  function limparCampos() {
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setcapacidadeTotal("");
    setfotoTexto("");
    setmapaURL("");
  }

  return (
    <section className="stack">
      
      {/* Título muda dependendo se é edição ou cadastro */}
      <h2>
        {eventoParaEditar ? "Editar Evento" : "Cadastrar Evento"}
      </h2>

      {/* Formulário de cadastro/edição */}
      <form className="form" onSubmit={handleSubmit}>
        
        {/* Campo Título */}
        <label>
          Título <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </label>

        {/* Campo Data */}
        <label>
          Data <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </label>

        {/* Campo Capacidade total */}
        <label>
          Capacidade Total <input type="number" value={capacidadeTotal} onChange={(e) => setcapacidadeTotal(e.target.value)} />
        </label>

        {/* Campo Local */}
        <label>
          Local <input value={local} onChange={(e) => setLocal(e.target.value)} />
        </label>

        {/* Campo mapaURL */}
        <label>
          Mapa (use o URL) <input value={mapaURL} onChange={(e) => setmapaURL(e.target.value)} />
        </label>

        {/* Campo Fotos */}
        <label>
          Fotos <textarea value={fotoTexto} rows="4" onChange={(e) => setfotoTexto(e.target.value)} />
        </label>

        {/* Campo Descrição */}
        <label>
          Descrição <input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </label>

        {/* Campo Status (select) */}
        <label>
          Status 
          <select value={status} onChange={(e) => setStatus(e.target.value)} >
            <option value="aberto">Aberto</option>
            <option value="lotado">Lotado</option>
          </select>
        </label>

        {/* Botões de ação */}
        <div className="row">
          <button className="btn" type="submit">
            {eventoParaEditar ? "Atualizar" : "Salvar"}
          </button>

          <button
            className="btn ghost"
            type="button"
            onClick={() => navigate("/evento")}
          >
            Cancelar
          </button>
          
          <button type="button" className="btn danger" onClick={() => limparCampos(titulo, data, local, descricao)}>
            Limpar
          </button>
          
        </div>
      </form>
    </section>
  );
}