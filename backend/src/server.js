import express from 'express';
import { connectDB } from './config/database.js'
import userRoutes from './routes/userRoutes.js'

const PORT = 8000
await connectDB()

const app = express()

app.use('/api', userRoutes)

app.get('/', (req, res) => {
  res.status(200).send('Home')
})

app.get('/about', (req, res) => {
  res.status(200).send(`I'm Heitor`)
})

app.get('/*splat', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

