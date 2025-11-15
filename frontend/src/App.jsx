import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './components/Login/Login.jsx';
// import Cadastro from './components/Cadastro/Cadastro.jsx'; 
import './App.css';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <Home />
        }
      />

    </Routes >
  );
}

export default AppRouter; 