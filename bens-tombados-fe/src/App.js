// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importe as funcionalidades de roteamento
import Header from './components/header'; // Importe o Header
import LivroTombo from './pages/livro-tombo/livro-tombo'; // Importe o componente Livro Tombo
import AtoLegal from './pages/ato-legal'; // Importe o componente Ato Legal
import Distrito from './pages/distrito';
import Municipio from './pages/municipio';

function App() {
  return (
    <Router> {/* Envolva o App com Router para ativar o roteamento */}
      <div className="App">
        <Header title="Bens tombados" /> {/* Apenas o Header */}
        
        {/* Defina as rotas do seu aplicativo */}
        <Routes>
          {/* A rota "/" renderiza a página inicial */}
          <Route path="/" element={<div> 
            <h2>Bem-vindo à página principal</h2>
            <p>Esta é a página inicial.</p>
          </div>} />

          {/* A rota "/livro-tombo" renderiza a página Livro Tombo */}
          <Route path="/livro-tombo" element={<LivroTombo />} />

          {/* A rota "/ato-legal" renderiza a página Ato Legal */}
          <Route path="/ato-legal" element={<AtoLegal />} />
          <Route path="/distrito" element={<Distrito />} />
          <Route path="/municipio" element={<Municipio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
