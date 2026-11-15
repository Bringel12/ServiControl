
import { useState } from 'react';
import './Servicos.css';

export default function Servicos() {
  const [servicos, setServicos] = useState([
    {
      id: 1,
      nome: 'Manutenção preventiva',
      categoria: 'Manutenção',
      preco: 150,
      duracao: '2 horas',
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Instalação de equipamentos',
      categoria: 'Instalação',
      preco: 200,
      duracao: '3 horas',
      status: 'Ativo'
    }
  ]);

  const [busca, setBusca] = useState('');

  const filtrados = servicos.filter(servico =>
    servico.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="servicos-page">

      <div className="servicos-header">
        <div>
          <h1>Gestão de Serviços</h1>
          <p>Cadastre, organize e gerencie seus serviços.</p>
        </div>

        <button className="btn-novo-servico">
          + Novo Serviço
        </button>
      </div>

      <div className="servicos-stats">
        <div className="servico-card">
          <span>Total de serviços</span>
          <h2>{servicos.length}</h2>
        </div>

        <div className="servico-card">
          <span>Serviços ativos</span>
          <h2>
            {servicos.filter(s => s.status === 'Ativo').length}
          </h2>
        </div>
      </div>

      <div className="servicos-content">
        <div className="servicos-toolbar">
          <h3>Seus serviços</h3>

          <input
            type="text"
            placeholder="Buscar serviço..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>

        <table className="servicos-table">
          <thead>
            <tr>
              <th>Serviço</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Duração</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map(servico => (
              <tr key={servico.id}>
                <td>{servico.nome}</td>
                <td>{servico.categoria}</td>
                <td>
                  R$ {servico.preco.toFixed(2)}
                </td>
                <td>{servico.duracao}</td>
                <td>
                  <span className="status-ativo">
                    {servico.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
