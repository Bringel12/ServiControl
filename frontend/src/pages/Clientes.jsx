import { useState } from "react";
import "./Clientes.css";

export default function Clientes() {
  // Simulando dados que viriam do backend futuramente
  const [clientes] = useState([
    { id: 1, nome: "Ana Silva", email: "ana@email.com", telefone: "(11) 99999-1111", status: "Ativo" },
    { id: 2, nome: "Carlos Souza", email: "carlos@email.com", telefone: "(11) 99999-2222", status: "Ativo" },
    { id: 3, nome: "Mariana Costa", email: "mariana@email.com", telefone: "(11) 99999-3333", status: "Inativo" },
    { id: 4, nome: "João Pedro", email: "joao@email.com", telefone: "(11) 99999-4444", status: "Ativo" },
  ]);

  return (
    <div className="clientes-page">
      
      {/* CABEÇALHO DA PÁGINA */}
      <header className="page-header">
        <div>
          <h1>Gestão de Clientes</h1>
          <p>Gerencie os clientes da sua empresa.</p>
        </div>
        <button className="btn-primary">
          + Novo Cliente
        </button>
      </header>

      {/* CARD DA TABELA */}
      <div className="table-card">
        
        {/* BARRA DE FERRAMENTAS (Busca e Filtros) */}
        <div className="table-toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Buscar cliente por nome ou e-mail..." />
          </div>
          <button className="btn-filter">Filtros</button>
        </div>

        {/* TABELA */}
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="td-name">
                  <div className="avatar-small">{cliente.nome.charAt(0)}</div>
                  {cliente.nome}
                </td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>
                  <span className={`status-badge ${cliente.status.toLowerCase()}`}>
                    {cliente.status}
                  </span>
                </td>
                <td>
                  <button className="btn-action">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* RODAPÉ DA TABELA */}
        <div className="table-footer">
          <span>Mostrando 4 de 4 clientes</span>
          <div className="pagination">
            <button disabled>Anterior</button>
            <button className="active">1</button>
            <button disabled>Próxima</button>
          </div>
        </div>

      </div>
    </div>
  );
}