import { MongoClient } from 'mongodb';


const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
let dbInstance

export async function connectDB() {
  dbInstance = client.db('teste')
  console.log('conectado no banco')

  // const res = await database.collection('nomes').find().toArray()
  // console.log(res)
  // client.close()
}

export function getDb() {
  if (!dbInstance) {
    throw new Error("Banco de dados não conectado! Chame connectDB primeiro.");
  }
  return dbInstance;
}