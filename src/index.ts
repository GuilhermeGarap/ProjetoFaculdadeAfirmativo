import express from 'express';
import { router } from './config/routes';

const app = express();

//Configurar a aplicação para receber dados no formato json
app.use(express.json());

//Configurar a aplicação para usar o router
app.use(router);


//O comando listen roda a aplicação
app.listen(3000, function(){
    console.clear();
    console.log("Aplicação rodando na porta 3000");
});
