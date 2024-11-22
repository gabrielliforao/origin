import express from 'express';
// Importa o framework Express.js para criar a aplicação web.
import routes from './src/routes/postsRoutes.js';
// Cria uma instância do Express, que será o núcleo da aplicação.
const app = express()
// Pede para abrir a pasta uploads -- servir arquivos estáticos
app.use(express.static('uploads')) 
routes(app)


const posts = [
    { id: 1, descricao: 'Uma foto teste', imagem: 'https://placecats.com/millie/300/150' },
    { id: 2, descricao: 'Gatinho dormindo', imagem: 'https://placecats.com/seleciona_uma_imagem/300/150' },
    { id: 3, descricao: 'Gato fazendo panqueca', imagem: 'https://placecats.com/millie/300/150' },
    
  ]
// Define um array de objetos para armazenar os posts de forma temporária. 
// Em uma aplicação real, esses dados seriam obtidos do banco de dados.

app.listen(3000,() => {
    console.log('servidor escutando...');
});
// Inicia o servidor na porta 3000 e exibe uma mensagem no console indicando que o servidor está ouvindo.

 
app.get('/posts', async (req, res) => {
  const posts = await getTodosPosts()
  // Chama a função assíncrona getTodosPosts() para obter todos os posts do banco de dados.
    res.status(200).json(posts);
  // Envia uma resposta HTTP com status 200 (sucesso) e o array de posts no formato JSON.
});
