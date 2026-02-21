// src/pages/LoginPage.jsx
import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // REQUISITO: Verificar credenciales (Hardcodeado para el proyecto)
    if (user === 'admin' && pass === '1234') {
      onLogin();
    } else {
      alert('Credenciales incorrectas.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#ff6b6b' }}>
          Recetario CRUD - Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Usuario:</label>
            <input 
              type="text" 
              value={user} 
              onChange={(e) => setUser(e.target.value)} 
              placeholder=""
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Contraseña:</label>
            <input 
              type="password" 
              value={pass} 
              onChange={(e) => setPass(e.target.value)} 
              placeholder=""
              required
            />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;