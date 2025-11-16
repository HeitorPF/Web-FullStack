import { Router } from 'express'
import { criarUsuario, validaUsuario } from '../models/user.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body
    res.json(await validaUsuario(email, senha))
  }
  catch (err) {
    console.log(err)
  }
})

router.post('/register', async (req, res) => {
  try {

    const { email, senha } = req.body
    const novoNome = { email: email, senha: senha };

    const result = await criarUsuario(novoNome);

    res.status(201).json({ message: "Cliente criado com sucesso!", result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao inserir cliente" });
  }
});

export default router;