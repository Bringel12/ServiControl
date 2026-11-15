import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import api from "./services/api";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Financeiro from "./pages/Financeiro"; 
import Servicos from "./pages/Servicos";
import Layout from "./components/Layout";

import "./App.css";

function App() {
  const [mode, setMode] = useState("register"); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "register" ? "/auth/register" : "/auth/login";
      
      const payload = mode === "register" 
        ? {
            companyName: form.companyName,
            name: `${form.firstName} ${form.lastName}`.trim(),
            email: form.email,
            password: form.password
          }
        : {
            email: form.email,
            password: form.password
          };

      await api.post(endpoint, payload);
      const response = await api.get("/auth/me");
      setUser(response.data.user); 

    } catch (err) {
      console.log("Erro real do backend:", err);
      setError(
        err.response?.data?.message || "Não foi possível realizar a operação."
      );

      // --- PLANO B: BOTÃO DE TESTE ---
      setTimeout(() => {
        setUser({
          name: `${form.firstName} ${form.lastName}`.trim() || "Usuário Teste",
          email: form.email,
          company: { name: form.companyName || "Minha Empresa Teste" },
          role: "OWNER"
        });
      }, 1500);

    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.log("Erro ao avisar backend, mas limpando sessão local.");
    } finally {
      document.cookie = "servicontrol_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUser(null); 
      setMode("login");
    }
  }

  // --- TELA PÓS-LOGIN (ROTAS) ---
  if (user) {
    return (
 
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />

    <Route
      path="/dashboard"
      element={<Layout user={user} onLogout={handleLogout} />}
    >
      <Route index element={<Dashboard user={user} />} />

      <Route path="clientes" element={<Clientes />} />

      <Route path="financeiro" element={<Financeiro />} />

      {/* Página de Serviços */}
      <Route path="servicos" element={<Servicos />} />

    </Route>

    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
</BrowserRouter>

    );
  }

  // --- TELA DE LOGIN/CADASTRO ---
  return (
    <main className="auth-container">
      <div className="auth-card-wrapper">
        
        {/* LADO ESQUERDO */}
        <section className="left-panel">
          <div className="brand-header">
            <h1>DataFlow</h1>
            <p>AI-powered analytics for high-growth teams</p>
          </div>

          <div className="charts-area">
            <div className="chart-box">
              <span className="badge">+24.5%</span>
              <div className="bars">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            </div>

            <div className="chart-box">
              <span className="badge blue">50.2K</span>
              <svg viewBox="0 0 100 60" className="line-svg">
                <defs>
                  <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,50 L30,35 L60,20 L90,10 L90,60 L0,60 Z" fill="url(#gradient)" />
                <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points="0,50 30,35 60,20 90,10" />
                <circle cx="90" cy="10" r="3" fill="#fff" />
              </svg>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-item"><h3>99.9%</h3><p>Uptime</p></div>
            <div className="stat-item"><h3>50K+</h3><p>Teams</p></div>
            <div className="stat-item"><h3>24/7</h3><p>Support</p></div>
          </div>
        </section>

        {/* LADO DIREITO */}
        <section className="right-panel">
          <div className="form-container">
            <h2>Get Started</h2>

            <div className="auth-toggle">
              <button 
                type="button"
                className={mode === "register" ? "active" : ""} 
                onClick={() => setMode("register")}
              >
                Sign up
              </button>
              <button 
                type="button"
                className={mode === "login" ? "active" : ""} 
                onClick={() => setMode("login")}
              >
                Sign in
              </button>
            </div>

            <div className="social-login">
              <button type="button" className="social-btn">
                <span className="icon"></span> Continue with Apple
              </button>
              <button type="button" className="social-btn">
                <span className="icon" style={{color: '#4285F4'}}>G</span> Continue with Google
              </button>
            </div>

            <div className="divider"><span>or</span></div>

            <form onSubmit={handleSubmit}>
              {mode === "register" && (
                <>
                  <div className="input-group">
                    <label>Company Name</label>
                    <input name="companyName" placeholder="Sua Empresa" value={form.companyName} onChange={handleChange} required />
                  </div>
                  <div className="row-inputs">
                    <div className="input-group">
                      <label>First name</label>
                      <input name="firstName" placeholder="Jane" value={form.firstName} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                      <label>Last name</label>
                      <input name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                </>
              )}

              <div className="input-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} minLength={8} required />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Loading..." : mode === "register" ? "Sign up" : "Sign in"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;