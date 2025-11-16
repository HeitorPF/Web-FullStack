import { getDb } from '../config/database.js';

function getClienteCollection() {
  return getDb().collection('historico');
}

export async function adicionar(nomeArtista, nomeMusica) {
  const collection = getClienteCollection();

  const registro = {
    nomeArtista: String(nomeArtista),
    nomeMusica: String(nomeMusica)
  };

  const resultado = await collection.insertOne(registro);

  console.log(`Novo histórico adicionado: Artista='${registro.nomeArtista}', Música='${registro.nomeMusica}'`);

  return resultado;
}

export async function buscar(nomeArtista, nomeMusica) {
  const collection = getClienteCollection();
  const artistaSanitizado = String(nomeArtista).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const musicaSanitizada = String(nomeMusica).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const query = {
    nomeArtista: { $regex: artistaSanitizado, $options: 'i' },
    nomeMusica: { $regex: musicaSanitizada, $options: 'i' }
  };

  return await collection.find(query).toArray();
}


export async function deletar(nomeArtista, nomeMusica) {
  const collection = getClienteCollection();

  const query = {
    nomeArtista: String(nomeArtista),
    nomeMusica: String(nomeMusica)
  };

  return await collection.deleteOne(query);
}