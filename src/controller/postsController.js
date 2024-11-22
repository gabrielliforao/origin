// Importa as funções necessárias para interagir com o banco de dados e o sistema de arquivos
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModels.js";
import fs from 'fs';
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados utilizando a função `getTodosPosts`
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (sucesso) e os posts em formato JSON
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post do corpo da requisição
  const novoPost = req.body;
  // Tenta criar o novo post no banco de dados
  try {
    // Chama a função `criarPost` para inserir o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado em formato JSON
    res.status(200).json(postCriado);
  // Captura qualquer erro que possa ocorrer durante a criação do post
  } catch (erro) {
    // Imprime a mensagem de erro no console para ajudar na depuração
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
    res.status(500).json({'Erro':'Falha na requisição'});
  }
}

// Função assíncrona para realizar o upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto para representar o novo post
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname, 
    alt: ""
  };
  // Tenta criar o novo post e renomear o arquivo da imagem
  try {
    // Chama a função `criarPost` para inserir o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Gera um novo nome para o arquivo da imagem utilizando o ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado em formato JSON
    res.status(200).json(postCriado);
  // Captura qualquer erro que possa ocorrer durante o processo de upload
  } catch (erro) {
    // Imprime a mensagem de erro no console para ajudar na depuração
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
    res.status(500).json({'Erro':'Falha na requisição'});
  }
}


export async function atualizarNovoPost(req, res) {
  
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`
  const novoPost ={
      imgUrl: urlImagem,
      descricao: req.body.descricao,
      alt: req.body.alt
  }
  
  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imageBuffer)

    const novoPost ={
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
  }
    const postCriado = await atualizarPost(id, novoPost);
    
    res.status(200).json(postCriado);
 
  } catch (erro) {
   
    console.error(erro.message);

    res.status(500).json({'Erro':'Falha na requisição'});
  }
}