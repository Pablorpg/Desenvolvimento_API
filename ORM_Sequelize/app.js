import express from "express";
import { conn } from "./conn.js";


// Tabelas
import Usuario from "./model/Usuario.js";
import Perfil from "./model/Perfil.js";
import Postagem from "./model/Postagem.js";
import Comentario from "./model/Comentario.js";

const app = express();

conn.sync()

app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333");
});