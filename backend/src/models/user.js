import { getDb } from '../config/database.js';
import bcrypt from 'bcrypt'; // Importe a biblioteca de hashing

const SALT_ROUNDS = 10;

function getClienteCollection() {
  return getDb().collection('users');
}

/**
 * Cria um novo usuário, hasheando a senha antes de salvar.
 */
export async function criarUsuario(novoCliente) {
  const collection = getClienteCollection();

  if (novoCliente.senha) {
    const senhaHash = await bcrypt.hash(novoCliente.senha, SALT_ROUNDS);
    novoCliente.senha = senhaHash;
  }

  return await collection.insertOne(novoCliente);
}

export async function validaUsuario(email, senha) {
  const collection = getClienteCollection();

  const usuario = await collection.findOne({ email: email });

  if (!usuario) {
    return null;
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (senhaCorreta) {
    delete usuario.senha;
    return usuario;
  } else {
    console.log(`Falha de autenticação para o email: ${email}`);
    return null;
  }
}
