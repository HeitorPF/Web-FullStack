import { getDb } from '../config/database.js';

function getClienteCollection() {
  return getDb().collection('users');
}

export async function criarUsuario(novoCliente) {
  const collection = getClienteCollection();
  
  return await collection.insertOne(novoCliente);
}

export async function validaUsuario(email, senha) {
  const collection = getClienteCollection();

  const query = {email: email, senha:senha}

  let resultado = await collection.find(query).toArray()

  return resultado
}