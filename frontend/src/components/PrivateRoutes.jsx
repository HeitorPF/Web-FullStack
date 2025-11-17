import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLyrics } from '../context/LyricsContext'; // Caminho adaptado

const PrivateRoutes = () => {
    const { token } = useLyrics();

    return (
        token ? <Outlet /> : <Navigate to="/login" replace />
    );
};

export default PrivateRoutes;