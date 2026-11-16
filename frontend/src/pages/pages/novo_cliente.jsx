
import { useState } from "react";
import "./NovoCliente.css";

function NovoCliente({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    documento: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    cidade: "",
    estado: "",
    observacoes: "",
    status: "Ativo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...form,
      id: Date.now(),
    });

    setForm({
      nome: "",
      documento: "",
      email: "",
      telefone: "",
      cep: "",
      endereco: "",
      numero: "",
      cidade: "",
      estado: "",
      observacoes: "",
      status: "Ativo",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-cliente"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>Novo Cliente</h2>
            <p>Preencha os dados para cadastrar um novo cliente.</p>
          </div>

          <button
            type="button"
            className="btn-fechar"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Informações pessoais</h3>

            <div className="form-grid">
              <div className="form-group full">
                <label>Nome completo *</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Digite o nome completo"
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>CPF / CNPJ *</label>
                <input
                  type="text"
                  name="documento"
                  placeholder="Digite o CPF ou CNPJ"
                  value={form.documento}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Telefone *</label>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  value={form.telefone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full">
                <label>E-mail *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="exemplo@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Endereço</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>CEP</label>
                <input
                  type="text"
                  name="cep"
                  placeholder="00000-000"
                  value={form.cep}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Estado</label>
                <input
                  type="text"
                  name="estado"
                  placeholder="SC"
                  value={form.estado}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full">
                <label>Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  placeholder="Rua, avenida..."
                  value={form.endereco}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Número</label>
                <input
                  type="text"
                  name="numero"
                  placeholder="Número"
                  value={form.numero}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  placeholder="Cidade"
                  value={form.cidade}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Outras informações</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="form-group full">
                <label>Observações</label>
                <textarea
                  name="observacoes"
                  placeholder="Informações adicionais sobre o cliente..."
                  value={form.observacoes}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-cancelar"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button type="submit" className="btn-salvar">
              Cadastrar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovoCliente;
