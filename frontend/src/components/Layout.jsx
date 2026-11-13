import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css"; // Vamos criar este CSS no próximo passo

export default function Layout({ user, onLogout }) {
  const navigate = useNavigate();

  function handleSair() {
    onLogout();
    navigate("/");
  }

  return (
    <div className="layout-container">
      
      {/* SIDEBAR BRANCA */}
      <aside className="sidebar">
        <div className="brand">
          <div className="logo-icon">F</div>
          <h2>ServiControl</h2>
        </div>

        {/* Menu de Navegação */}
        <nav className="nav-menu">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
             <span className="icon">📊</span> Dashboard
          </NavLink>
          <NavLink to="/dashboard/clientes" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="icon">👥</span> Clientes
          </NavLink>
          <NavLink to="/dashboard/servicos" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="icon">🛠️</span> Serviços
          </NavLink>
          <NavLink to="/dashboard/financeiro" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="icon">💰</span> Financeiro
          </NavLink>
        </nav>

        {/* Rodapé com Perfil e Sair */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">{user?.name?.charAt(0).toUpperCase() || "U"}</div>
            <div className="user-info">
              <span className="name">{user?.name || "Usuário"}</span>
              <span className="email">{user?.email || "email@teste.com"}</span>
            </div>
          </div>
          <button onClick={handleSair} className="btn-logout">
            Sair da conta
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL (Muda conforme a rota) */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}