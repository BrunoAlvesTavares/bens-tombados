// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importe as funcionalidades de roteamento
import Header from './components/header'; // Importe o Header
import LivroTombo from './pages/livro-tombo'; // Importe o componente LivroTombo

function App() {
  return (
    <Router> {/* Envolva o App com Router para ativar o roteamento */}
      <div className="App">
        <Header title="Bens tombados" /> {/* Apenas o Header */}
        
        {/* Defina as rotas do seu aplicativo */}
        <Routes>
          {/* A rota "/" renderiza a página inicial */}
          <Route path="/" element={<div> {/* Conteúdo da página normal */} 
            <h2>Bem-vindo à página principal</h2>
            <p>Esta é a página inicial.</p>
          </div>} />

          {/* A rota "/livro-tombo" renderiza a página Livro Tombo */}
          <Route path="/livro-tombo" element={<LivroTombo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
