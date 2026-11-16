
import { useState } from "react";
import "./Clientes.css";
import Novo_cliente from "./pages/novo_cliente.jsx";

export default function Clientes() {
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [menuAberto, setMenuAberto] = useState(null);

  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: "Ana Silva",
      email: "ana@email.com",
      telefone: "(11) 99999-1111",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Carlos Souza",
      email: "carlos@email.com",
      telefone: "(11) 99999-2222",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Mariana Costa",
      email: "mariana@email.com",
      telefone: "(11) 99999-3333",
      status: "Inativo",
    },
    {
      id: 4,
      nome: "João Pedro",
      email: "joao@email.com",
      telefone: "(11) 99999-4444",
      status: "Ativo",
    },
  ]);

  const adicionarCliente = (novoCliente) => {
    setClientes((anteriores) => [...anteriores, novoCliente]);
  };

  // Pesquisa
  const clientesFiltrados = clientes.filter((cliente) => {
    const termo = busca.toLowerCase().trim();

    return (
      cliente.nome.toLowerCase().includes(termo) ||
      cliente.email.toLowerCase().includes(termo) ||
      cliente.telefone.toLowerCase().includes(termo)
    );
  });

  // Alterar status
  const alterarStatus = (id) => {
    setClientes((anteriores) =>
      anteriores.map((cliente) =>
        cliente.id === id
          ? {
              ...cliente,
              status: cliente.status === "Ativo" ? "Inativo" : "Ativo",
            }
          : cliente
      )
    );

    setMenuAberto(null);
  };

  // Excluir cliente
  const excluirCliente = (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este cliente?"
    );

    if (confirmar) {
      setClientes((anteriores) =>
        anteriores.filter((cliente) => cliente.id !== id)
      );
    }

    setMenuAberto(null);
  };

  return (
    <div className="clientes-page">

      <header className="page-header">
        <div>
          <h1>Gestão de Clientes</h1>
          <p>Gerencie os clientes da sua empresa.</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setModalAberto(true)}
        >
          + Novo Cliente
        </button>
      </header>

      <div className="table-card">

        <div className="table-toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>

            <input
              type="text"
              placeholder="Buscar cliente por nome, e-mail ou telefone..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <button className="btn-filter">
            Filtros
          </button>
        </div>

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
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="td-name">
                    <div className="avatar-small">
                      {cliente.nome.charAt(0)}
                    </div>
                    {cliente.nome}
                  </td>

                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>

                  <td>
                    <span
                      className={`status-badge ${cliente.status.toLowerCase()}`}
                    >
                      {cliente.status}
                    </span>
                  </td>

                  <td className="actions-cell">
                    <button
                      className="btn-action"
                      onClick={() =>
                        setMenuAberto(
                          menuAberto === cliente.id ? null : cliente.id
                        )
                      }
                      aria-label={`Ações para ${cliente.nome}`}
                    >
                      ⋮
                    </button>

                    {menuAberto === cliente.id && (
                      <div className="actions-menu">
                        <button
                          onClick={() => alterarStatus(cliente.id)}
                        >
                          {cliente.status === "Ativo"
                            ? "Inativar cliente"
                            : "Ativar cliente"}
                        </button>

                        <button
                          className="delete-option"
                          onClick={() => excluirCliente(cliente.id)}
                        >
                          Excluir cliente
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="table-footer">
          <span>
            Mostrando {clientesFiltrados.length} de {clientes.length} clientes
          </span>

          <div className="pagination">
            <button disabled>Anterior</button>
            <button className="active">1</button>
            <button disabled>Próxima</button>
          </div>
        </div>

      </div>

      <Novo_cliente
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSave={adicionarCliente}
      />

    </div>
  );
}
