// Importa as bibliotecas necessárias: Express para criar o servidor, as funções de controle de posts e Multer para lidar com uploads de arquivos.
import express from 'express';
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controller/postsController.js';
import multer from 'multer';
import cors from 'cors';

const corsOptions = {
  origin:'http://localhost:8000',
  optionsSuccessStatus: 200
}
// Configura o armazenamento de arquivos utilizando o Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Substitua 'uploads/' pelo caminho desejado no seu servidor
  },
  // Define o nome do arquivo carregado
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Mantém o nome original do arquivo
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o middleware para analisar dados JSON no corpo das requisições
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota para listar todos os posts
  app.get('/posts', listarPosts);

  // Rota para criar um novo post
  app.post('/posts', postarNovoPost);

  // Rota para fazer upload de uma imagem e criar um novo post
  // Utiliza o middleware `upload.single('imagem')` para lidar com um único arquivo chamado 'imagem'
  app.post('/upload', upload.single('imagem'), uploadImagem);

  app.put('/upload/:id', atualizarNovoPost);
};

// Exporta a função de rotas para ser utilizada em outros módulos
export default routes;