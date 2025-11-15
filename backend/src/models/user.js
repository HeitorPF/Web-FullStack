import { getDb } from '../config/database.js';

function getClienteCollection() {
  return getDb().collection('nomes');
}

export async function criarNome(novoCliente) {
  const collection = getClienteCollection();
  
  return await collection.insertOne(novoCliente);
}