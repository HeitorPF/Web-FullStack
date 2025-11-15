import { getDb } from '../config/database.js';

function getClienteCollection() {
  return getDb().collection('historico');
}

export async function adicionar(nomeArtista, nomeMusica) {
  const collection = getClienteCollection();
  
  return await collection.insertOne({nomeArtista: nomeArtista, nomeMusica:nomeMusica});
}

export async function buscar(nomeArtista, nomeMusica) {
  const collection = getClienteCollection();

  const query = {
    nomeArtista: { $regex: nomeArtista, $options: 'i' }, 
    nomeMusica: { $regex: nomeMusica, $options: 'i' }
  }

  return await collection.find(query).toArray()
}

export async function deletar(nomeArtista, nomeMusica) {
  const collection = getClienteCollection();

  const query = {
    nomeArtista: nomeArtista, 
    nomeMusica: nomeMusica
  }

  return await collection.deleteOne(query)
}