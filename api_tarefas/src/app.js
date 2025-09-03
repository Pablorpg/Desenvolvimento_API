import express from "express";
import cors from "cors";

import { conn } from "./sequelize.js";

import setorModel from "./models/setorModel.js";
import tabelaTarefa from "./models/tarefaModel.js";

//IMPORTARAS ROTAS
import setorRoutes from "./routes/setorRoutes.js";
import tabelaRoutes from "./routes/tarefaRoutes.js"

const PORT = 3333;

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

//conectar o banco e criar as tabelas
conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor HTTP is running on PORT:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

const logRoutes = (request, response, next) => {
  const { url, method } = request;
  const rota = `[${method.toUpperCase()}]- ${url}`;
  console.log(rota);
  next();
};

//MIDDLEWARE GLOBAL
app.use(logRoutes);

// Utilizar as rotas importadas
app.use("/setores", setorRoutes);
app.use("/tarefa", tabelaRoutes)

app.use((request, response) => {
  response.status(404).json({ mensagem: "Rota não encontrada" });
});