import { Router } from 'express'
import { adicionar, buscar, deletar } from '../models/Historico.js'
import { expressjwt } from 'express-jwt'

const router = Router();

router.post('/adicionar', expressjwt({secret: 'teste', algorithms:['HS256']}),async (req, res) => {
  try {
    const { nomeArtista, nomeMusica } = req.body

    const result = await adicionar(nomeArtista, nomeMusica)
    res.status(201).json({ message: "Musica adicionada ao histórico!", result });
  }
  catch(err) {
    console.log(err)
    res.status(500).json({ error: "Erro ao inserir no histórico!" });
  }
})

router.get('/busca', expressjwt({secret: 'teste', algorithms:['HS256']}), async (req, res) => {
  try {

    const {nomeArtista, nomeMusica} = req.body

    const result = await buscar(nomeArtista, nomeMusica);
     
    res.status(201).json({ message: "Busca realizada!", result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao realizar busca!" });
  }
});

router.delete('/deletar', expressjwt({secret: 'teste', algorithms:['HS256']}), async (req, res) => {
  try{
    const {nomeArtista, nomeMusica} = req.body

    const result = await deletar(nomeArtista, nomeMusica)

    res.status(201).json({ message: "Música excluída!", result });

  } catch(err) {
    console.log(err)
    res.status(201).json({ message: "Falha ao excluir música!", result });
  }
})
export default router;