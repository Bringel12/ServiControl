import { useState } from "react";
import api from "./services/api";
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
      
      const payload = {
        ...form,
        name: `${form.firstName} ${form.lastName}`.trim()
      };

      await api.post(endpoint, payload);

      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch (err) {
      setError(
        err.response?.data?.message || "Não foi possível realizar a operação."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setMode("login");
    } catch {
      setError("Não foi possível encerrar a sessão.");
    }
  }

  if (user) {
    return (
      <main className="dashboard">
        <div className="welcome-card">
          <h1>Bem-vindo ao DataFlow!</h1>
          <p>Olá, {user.name}.</p>
          <p>Empresa: {user.company?.name}</p>
          <button onClick={handleLogout}>Sair da conta</button>
        </div>
      </main>
    );
  }

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
                <polyline 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="2" 
                  points="0,50 30,35 60,20 90,10" 
                />
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

        {/* LADO DIREITO */}
        <section className="right-panel">
          <div className="form-container">
            <h2>Get Started</h2>

            <div className="auth-toggle">
              <button 
                className={mode === "register" ? "active" : ""} 
                onClick={() => setMode("register")}
              >
                Sign up
              </button>
              <button 
                className={mode === "login" ? "active" : ""} 
                onClick={() => setMode("login")}
              >
                Sign in
              </button>
            </div>

            <div className="social-login">
              <button className="social-btn">
                 <span className="icon"></span> Continue with Apple
              </button>
              <button className="social-btn">
                <span className="icon" style={{color: '#4285F4'}}>G</span> Continue with Google
              </button>
            </div>

            <div className="divider">
              <span>or</span>
            </div>

            <form onSubmit={handleSubmit}>
              {mode === "register" && (
                <div className="row-inputs">
                  <div className="input-group">
                    <label>First name</label>
                    <input
                      name="firstName"
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Last name</label>
                    <input
                      name="lastName"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
                {mode === "register" && (
                  <div className="password-hints">
                    <span>Min 12 characters</span>
                    <span>Min 1 number</span>
                    <span>Mixed case</span>
                  </div>
                )}
              </div>

              {error && <p className="error-message">{error}</p>}

              <p className="terms-text">
                By signing up, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
              </p>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Loading..." : mode === "register" ? "Sign up" : "Sign in"}
              </button>
            </form>

            <div className="mobile-switch">
               {mode === "login" ? (
                  <p>Don't have an account? <button onClick={() => setMode("register")}>Sign up</button></p>
               ) : (
                  <p>Already have an account? <button onClick={() => setMode("login")}>Sign in</button></p>
               )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;