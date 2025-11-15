import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './components/Login/Login.jsx';
// import Cadastro from './components/Cadastro/Cadastro.jsx'; 
import './App.css'; // Mantenha a importação de CSS
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { BrowserRouter } from 'react-router-dom';
function AppRouter() {
  return (
    <Routes>
      {/* Rota para Login - Não Protegida */}
      <Route path="/login" element={<Login />} />

      {/* Rota Protegida para o conteúdo principal */}
      <Route
        path="/"
        element={
            <Home />
        }
      />

      {/* Exemplo de Rota para Cadastro, se existir */}
      {/* <Route path="/cadastro" element={<Cadastro />} /> */}

      {/* Você pode adicionar um tratamento para rotas não encontradas (404) aqui, se desejar */}
    </Routes >
  );
}

export default AppRouter; // Renomeado para evitar conflito