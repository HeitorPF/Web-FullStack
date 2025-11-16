import { getDb } from '../config/database.js';

function getClienteCollection() {
  return getDb().collection('historico');
}

export async function adicionar(nomeArtista, nomeMusica, emailUsuario) {
  const collection = getClienteCollection();

  const registro = {
    nomeArtista: String(nomeArtista),
    nomeMusica: String(nomeMusica),
    emailUsuario: String(emailUsuario)
  };

  const resultado = await collection.insertOne(registro);

  console.log(`Novo histórico adicionado: Artista='${registro.nomeArtista}', Música='${registro.nomeMusica}'`);

  return resultado;
}

export async function buscar(nomeArtista, nomeMusica, emailUsuario) {
  const collection = getClienteCollection();
  const artistaSanitizado = String(nomeArtista).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const musicaSanitizada = String(nomeMusica).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const query = {
    nomeArtista: { $regex: artistaSanitizado, $options: 'i' },
    nomeMusica: { $regex: musicaSanitizada, $options: 'i' },
    emailUsuario: emailUsuario
  };

  return await collection.find(query).toArray();
}


export async function deletar(nomeArtista, nomeMusica, emailUsuario) {
  const collection = getClienteCollection();

  const query = {
    nomeArtista: String(nomeArtista),
    nomeMusica: String(nomeMusica),
    emailUsuario: String(emailUsuario)
  };

  return await collection.deleteOne(query);
}