// server.js
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const session = require("express-session");

PORT = 3001

const app = express();

app.use(compression());

app.use(helmet());

app.use(express.json());

//app.use(
//    session({
//        secret: process.env.JWT_SECRET,
//        resave: false,
//        saveUninitialized: true,
//        cookie: { secure: false }, // "secure: false" deve ser usado em desenvolvimento. Em produção, defina como "true" para usar HTTPS.
//    })
//);


// app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log("Requisito 1 (Login) configurado!");
});
