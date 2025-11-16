import { Router } from 'express'
import { adicionar, buscar, deletar } from '../models/Historico.js';

const router = Router();

//adicionar música no histórico
router.post('/adicionar', jwt_middleware({secret: 'teste', algorithms:['HS256']}),async (req, res) => {
  try {
    const { nomeArtista, nomeMusica } = req.body //recupera nome de artista e música passados
    console.log(req.user.email)
    const result = await adicionar(nomeArtista, nomeMusica) //utiliza a função para adicionar o banco de dados
    res.status(201).json({ message: "Musica adicionada ao histórico!", result });
  }
  catch(err) {
    console.log(err)
    res.status(500).json({ error: "Erro ao inserir no histórico!" });
  }
})

router.get('/busca', async (req, res) => {
  try {

    const {nomeArtista, nomeMusica} = req.body

    const result = await buscar(nomeArtista, nomeMusica);
     
    res.status(201).json({ message: "Busca realizada!", result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao realizar busca!" });
  }
});

router.delete('/deletar', async (req, res) => {
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