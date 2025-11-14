import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // 1. Verifica a autenticação buscando o token no localStorage
    const isAuthenticated = localStorage.getItem("accessToken");

    // Note: Você pode usar "isAuthenticated" ou "accessToken", 
    // dependendo de como você armazena o status de login.
    // Assumimos que a presença de 'accessToken' significa logado.

    if (!isAuthenticated) {
        // Se não estiver autenticado (token ausente), redireciona para /login
        return <Navigate to="/login" replace />;
    }

    // Se estiver autenticado, renderiza o componente filho (por exemplo, <Home />)
    return children;
};

export default ProtectedRoute;