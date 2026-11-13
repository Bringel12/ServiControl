import { NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Sidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
      navigate("/"); // Volta para o login
      window.location.reload(); // Recarrega para limpar o estado
    } catch (error) {
      console.error("Erro ao sair", error);
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>ServiControl</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          📊 Visão Geral
        </NavLink>
        <NavLink to="/dashboard/clientes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          👥 Clientes
        </NavLink>
        <NavLink to="/dashboard/servicos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          🛠️ Serviços
        </NavLink>
        <NavLink to="/dashboard/financeiro" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          💰 Financeiro
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn-sidebar">Sair da conta</button>
      </div>
    </aside>
  );
}