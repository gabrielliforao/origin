import 'dotenv/config';
import { ObjectId } from "mongodb"
import conectarAoBanco from "../config/dbConfig.js"
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)
// Conecta ao banco de dados usando a string de conexão obtida da variável de ambiente STRING_CONEXAO. O resultado da conexão é armazenado na variável conexao.

 
 export async function getTodosPosts() {
      const db = conexao.db('imersao-instabytes')
      // Obtém o banco de dados chamado 'imersao-instabytes' da conexão estabelecida.
      const colecao = db.collection('posts')
      // Obtém a coleção 'posts' dentro do banco de dados.
      return colecao.find().toArray()
      // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
     }
    
    export async function criarPost(novoPost) {
      // Conecta-se ao banco de dados e seleciona a coleção de posts
      const db = conexao.db('imersao-instabytes');
      const colecao = db.collection('posts');
    
      // Insere um novo post na coleção e retorna um objeto com informações sobre o documento inserido
      return colecao.insertOne(novoPost);
    }

    export async function atualizarPost(id, novoPost) {
      
      const db = conexao.db('imersao-instabytes');
      const colecao = db.collection('posts');
      const objID = ObjectId.createFromHexString(id);
    
      
      return colecao.updateOne( {_id: new ObjectId(objID)},{$set:novoPost});
    }