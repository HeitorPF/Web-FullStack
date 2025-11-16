import express from 'express';
import { connectDB } from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import historicoRoutes from './routes/historicoRoutes.js'
const compression = require('compression');

const PORT = 8000
await connectDB()

const app = express()

app.use(express.json())

app.use(compression());

app.use('/api', userRoutes)
app.use('/hist', historicoRoutes)

app.get('/', (req, res) => {
  res.status(200).send('Home')
})

app.get('/*splat', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
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
