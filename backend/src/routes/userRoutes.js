import { Router } from 'express'
import { criarUsuario, validaUsuario } from '../models/user.js';
import jwt from 'jsonwebtoken'


const chave = 'teste'
const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body
    const resultado = await validaUsuario(email, senha)
    if(resultado != []) {
      const token = jwt.sign({email: email}, chave)
      res.status(201).json({ message: "Login realizado!", result: {token: token}});
    }
  }
  catch (err) {
    console.log(err)
     res.status(401).json({ message: "Falha ao logar!",  result: {error: err}});
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