import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout({ user }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <header className="topbar">
          <div className="topbar-info">
            <span>Bem-vindo,</span>
            <strong>{user?.name || "Usuário"}</strong>
          </div>
          <div className="company-badge">
            Empresa: {user?.company?.name || "Carregando..."}
          </div>
        </header>
        
        <div className="content-area">
          {/* O Outlet renderiza a página filha (Dashboard, Clientes, etc) */}
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}