import { Router } from 'express'
import { criarNome } from '../models/user.js';

const router = Router();

router.post('/nome', async (req, res) => {
  try {
    const novoNome = { nome: 'hpf3', idade: 60};

    const result = await criarNome(novoNome);
     
    res.status(201).json({ message: "Cliente criado com sucesso!", result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao inserir cliente" });
  }
});

router.get('/teste',  (req, res) => {
  res.json([{name: 'poli', idade: 15}])
})

export default router;