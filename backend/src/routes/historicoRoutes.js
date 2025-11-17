import { Router } from 'express'
import { adicionar, buscar, deletar } from '../models/Historico.js'
import { expressjwt } from 'express-jwt'
const router = Router();

router.post('/adicionar', expressjwt({ secret: 'fullstack', algorithms: ['HS256'] }), async (req, res) => {
  try {
    const { nomeArtista, nomeMusica } = req.body

    const userEmail = req.auth.email;
    const result = await adicionar(nomeArtista, nomeMusica, userEmail)

    res.status(201).json({ message: "Musica adicionada ao histórico!", result });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: "Erro ao inserir no histórico!" });
  }
})


router.post('/buscar', expressjwt({ secret: 'fullstack', algorithms: ['HS256'] }), async (req, res) => {
  try {

    const { nomeArtista, nomeMusica } = req.body

    const userEmail = req.auth.email;

    console.log(userEmail);

    const result = await buscar(nomeArtista, nomeMusica, userEmail);

    res.status(201).json({ message: "Busca realizada!", result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao realizar busca!" });
  }
});

router.delete('/deletar', expressjwt({ secret: 'fullstack', algorithms: ['HS256'] }), async (req, res) => {
  try {
    const { nomeArtista, nomeMusica } = req.body

    const userEmail = req.auth.email;

    const result = await deletar(nomeArtista, nomeMusica, userEmail)

    res.status(201).json({ message: "Música excluída!", result });

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Falha ao excluir música!", result });
  }
})
export default router;