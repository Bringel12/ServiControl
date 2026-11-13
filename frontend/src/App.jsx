import { useEffect, useState } from "react";
import api from "./services/api";
import "./styles/global.css";

function App() {
  const [mode, setMode] = useState("register");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  // Verifica se o usuário já está logado ao abrir a página
  useEffect(() => {
    api.get("/auth/me")
      .then(response => setUser(response.data.user))
      .catch(() => setUser(null));
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "register" ? "/auth/register" : "/auth/login";

      // Prepara os dados no formato que o backend espera
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

      // Após o login/cadastro, busca os dados atualizados do usuário
      const response = await api.get("/auth/me");
      setUser(response.data.user);

    } catch (err) {
      setError(
        err.response?.data?.message || "Não foi possível conectar ao servidor."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Erro ao deslogar no backend");
    } finally {
      setUser(null);
      setMode("login");
    }
  }

  function handleSocialLogin(provider) {
    alert(`Integração com ${provider} será configurada em breve!`);
  }

  // --- TELA DE DASHBOARD (Pós Login) ---
  if (user) {
    return (
      <main className="dashboard">
        <header className="topbar">
          <h2>ServiControl</h2>
          <button onClick={handleLogout} className="logout-btn">Sair</button>
        </header>

        <section className="welcome">
          <span>Bem-vindo ao ServiControl</span>
          <h1>Olá, {user.name}!</h1>
          <p>Sua empresa: <strong>{user.company?.name || "Carregando..."}</strong></p>

          <div className="user-card">
            <strong>Conta criada com sucesso!</strong>
            <p>Seu acesso já está funcionando.</p>
            <small>Perfil: {user.role}</small>
          </div>
        </section>
      </main>
    );
  }

  // --- TELA DE LOGIN/CADASTRO (Layout da Imagem) ---
  return (
    <main className="auth-container">
      <div className="auth-card-wrapper">
        
        {/* LADO ESQUERDO (Azul) */}
        <section className="left-panel">
          <div className="brand-header">
            <h1>ServiControl</h1>
            <p>Gestão inteligente para sua empresa.</p>
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
            <div className="stat-item">
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Teams</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </section>

        {/* LADO DIREITO (Formulário) */}
        <section className="right-panel">
          <div className="form-container">
            <h2>{mode === "register" ? "Crie sua empresa" : "Bem-vindo de volta"}</h2>

            <div className="auth-toggle">
              <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
                Cadastrar
              </button>
              <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
                Entrar
              </button>
            </div>

            <div className="social-login">
              <button className="social-btn" onClick={() => handleSocialLogin("Apple")}>
                 <span className="icon"></span> Continue with Apple
              </button>
              <button className="social-btn" onClick={() => handleSocialLogin("Google")}>
                <span className="icon" style={{color: '#4285F4'}}>G</span> Continue with Google
              </button>
            </div>

            <div className="divider"><span>ou</span></div>

            <form onSubmit={handleSubmit}>
              {mode === "register" && (
                <>
                  <div className="input-group">
                    <label>Nome da Empresa</label>
                    <input
                      name="companyName"
                      placeholder="Ex: Minha Empresa"
                      value={form.companyName}
                      onChange={handleChange}
                      required
                      minLength={2}
                    />
                  </div>
                  
                  <div className="row-inputs">
                    <div className="input-group">
                      <label>Seu Nome</label>
                      <input
                        name="firstName"
                        placeholder="Jane"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        minLength={2}
                      />
                    </div>
                    <div className="input-group">
                      <label>Sobrenome</label>
                      <input
                        name="lastName"
                        placeholder="Doe"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        minLength={2}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="input-group">
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Senha</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Mínimo de 8 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={mode === "register" ? 8 : 1}
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Aguarde..." : mode === "register" ? "Criar minha empresa" : "Entrar"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;