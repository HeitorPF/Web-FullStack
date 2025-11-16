import { Router } from 'express'
import { buscaEmail, criarUsuario, validaUsuario } from '../models/user.js';
import jwt from 'jsonwebtoken'

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body
    const resultado = await validaUsuario(email, senha)
    if(resultado) {
      const token = jwt.sign({email: email}, 'fullstack')
      res.status(201).json({ message: "Login realizado!", result: {token: token}});
    }
    else{
      res.status(401).json({ message: "usuario não encontrado!", result: resultado});
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
    if(await buscaEmail(email)){
      res.json({ message: "Email ja existe", result: null })
    }
    else{
      const novoNome = { email: email, senha: senha };
      const result = await criarUsuario(novoNome);
      console.log(result)
      res.status(201).json({ message: "Cliente criado com sucesso!", result });
    }
    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao inserir cliente" });
  }
});

export default router;