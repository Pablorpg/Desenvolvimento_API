import express from "express";
import { conn } from "./conn.js";


// Tabelas
import Alunos from "./model/alunos.js";
import Treinos from "./model/Treinos.js";
import Execicios from "./model/Exercicios.js";
import TreinoExercicio from "./model/TreinoExercicio.js";


const app = express();

conn.sync()

app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333");
});