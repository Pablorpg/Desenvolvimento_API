import express from "express"
import cors from "cors"
import { conn } from "./config/sequelize.js"
import pensamentoRoute from "./routes/pensamentoRoute.js"

const app = express()

conn
    .sync()
    .then(() => {
        console.log("Banco de dados conectado!")
    })
    .catch((error) => console.log(error))

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json())

app.use("/", pensamentoRoute)

export default app