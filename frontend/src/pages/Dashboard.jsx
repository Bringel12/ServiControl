export default function Dashboard({ user }) {
  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#1e293b', fontSize: '28px' }}>Visão Geral</h1>
          <p style={{ color: '#64748b' }}>Bem-vindo de volta, <strong>{user?.name || 'Usuário'}</strong>!</p>
        </div>
      </header>

      {/* CARDS DE RESUMO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '5px' }}>Total de Clientes</p>
          <h2 style={{ color: '#0f172a', fontSize: '24px' }}>128</h2>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '5px' }}>Agendamentos Hoje</p>
          <h2 style={{ color: '#0f172a', fontSize: '24px' }}>12</h2>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '5px' }}>Ordens Pendentes</p>
          <h2 style={{ color: '#0f172a', fontSize: '24px' }}>5</h2>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '5px' }}>Faturamento Mês</p>
          <h2 style={{ color: '#16a34a', fontSize: '24px' }}>R$ 15.400</h2>
        </div>
      </div>

      {/* ÁREA DO GRÁFICO */}
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: '350px' }}>
        <h3 style={{ color: '#1e293b', marginBottom: '20px' }}>Gráfico de Faturamento</h3>
        <div style={{ height: '250px', backgroundColor: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#94a3b8' }}>Aqui entrará o gráfico real na próxima fase</p>
        </div>
      </div>
    </div>
  );
}