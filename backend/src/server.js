import express from 'express'
import https from 'https'
import cors from 'cors'
import fs from 'fs'
import path from 'path';  
import { fileURLToPath } from 'url'

import { connectDB } from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import historicoRoutes from './routes/historicoRoutes.js'
import compression from 'compression';


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = 8000

await connectDB()

const app = express()

app.use(express.json())

app.use(compression());
app.use(cors());

app.use('/user', userRoutes)
app.use('/hist', historicoRoutes)

app.get('/', (req, res) => {
  res.status(200).send('Home')
})

app.get('/*splat', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>');
});


const options = {
  key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
}

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor rodando em HTTPS: https://localhost:${PORT}`);
})

/*
{
    "message": "Cliente criado com sucesso!",
    "result": {
        "acknowledged": true,
        "data": dado
    }
}
*/
