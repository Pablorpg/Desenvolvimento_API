import express from "express"
import cors from "cors"
import { conn } from "./config/sequelize.js"

import path from "node:path"
import { fileURLToPath } from 'node:url'

// TABELAS
import './models/association.js'

// ROTAS
import autorRoutes from "./routes/autorRoutes.js"
import livroRoutes from "./routes/livroRouter.js"

// Inicializa o Express antes de usar `app`
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json()) // Aceita receber JSON
app.use(express.urlencoded({ extended: true })) // Aceita receber arquivos

app.use("/public", express.static(path.join(__dirname, '../public')))
//{alter: true} - atualiza a tabela | {froce: true} - recria o banco

conn
    .sync()
    .then(() => {
        console.log("Banco de dados conectado 🫥")
    })
    .catch((error) => console.log(error))

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
}))

// USAR/REGISTRAR AS ROTAS
app.use("/api/autores", autorRoutes)
app.use("/api/livros", livroRoutes)

app.get("/", (request, response) => {
    response.status(200).json({ mensagem: "Olá, Mundo!" })
})

export default app