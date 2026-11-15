import React from "react";
import "./Financeiro.css"; // Garanta que este arquivo está na mesma pasta!

export default function Financeiro() {
  const transacoes = [
    { id: 1, cliente: "João Silva", servico: "Manutenção Elétrica", valor: "R$ 350,00", data: "12/11/2026", status: "Pago" },
    { id: 2, cliente: "Maria Souza", servico: "Instalação de Ar", valor: "R$ 1.200,00", data: "11/11/2026", status: "Pendente" },
    { id: 3, cliente: "Empresa XYZ", servico: "Contrato Mensal TI", valor: "R$ 2.500,00", data: "10/11/2026", status: "Pago" },
    { id: 4, cliente: "Carlos Mendes", servico: "Reparo Hidráulico", valor: "R$ 180,00", data: "08/11/2026", status: "Pago" },
  ];

  return (
    <div className="pagina-financeiro">
      <div className="header-pagina">
        <h1>Gestão Financeira</h1>
        <p>Acompanhe o faturamento e os pagamentos dos seus serviços.</p>
      </div>

      {/* Cards de Resumo */}
      <div className="cards-resumo">
        <div className="card-financeiro">
          <span>Faturamento Mês</span>
          <h3 className="texto-verde">R$ 15.400,00</h3>
        </div>
        <div className="card-financeiro">
          <span>A Receber</span>
          <h3 className="texto-laranja">R$ 2.100,00</h3>
        </div>
        <div className="card-financeiro">
          <span>Contas em Atraso</span>
          <h3 className="texto-vermelho">R$ 450,00</h3>
        </div>
      </div>

      {/* Tabela de Transações */}
      <div className="tabela-container">
        <h2>Últimas Transações</h2>
        <div className="tabela-scroll">
          <table className="tabela-financeira">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.cliente}</strong></td>
                  <td>{item.servico}</td>
                  <td>{item.data}</td>
                  <td>{item.valor}</td>
                  <td>
                    <span className={`badge-status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}