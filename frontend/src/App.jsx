import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import './App.css';

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Home />} />
      </Route>

    </Routes >
  );
}

export default AppRouter; 