import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import CreateTodo from './components/CreateTodo.jsx';
import Login from './components/signin.jsx';
import Signup from './components/signup.jsx';
import Todos from './components/Todos.jsx';

function ProtectedRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />;
}

function Dashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);
  const username = localStorage.getItem('username') || 'there';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleCreated = () => {
    setActiveView('all');
    setRefreshKey((key) => key + 1);
  };

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setActiveView('all')} type="button">
          <span className="brand-mark">✓</span>
          <span>Daymark</span>
        </button>
        <div className="topbar-actions">
          <span className="welcome">Good to see you, {username.split('@')[0]}</span>
          <button className="button button-quiet" onClick={handleLogout} type="button">Log out</button>
        </div>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">PERSONAL WORKSPACE</p>
            <h1>Make room for what matters.</h1>
            <p className="subtitle">A clear list for a calmer day.</p>
          </div>
          <button className="button button-primary" onClick={() => setActiveView('add')} type="button">+ New todo</button>
        </div>

        <nav className="view-tabs" aria-label="Todo views">
          <button className={activeView === 'all' ? 'tab active' : 'tab'} onClick={() => setActiveView('all')} type="button">All todos</button>
          <button className={activeView === 'completed' ? 'tab active' : 'tab'} onClick={() => setActiveView('completed')} type="button">Completed</button>
          <button className={activeView === 'add' ? 'tab active' : 'tab'} onClick={() => setActiveView('add')} type="button">Add todo</button>
        </nav>

        {activeView === 'add' ? <CreateTodo onCreated={handleCreated} /> : <Todos key={refreshKey} view={activeView} />}
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
