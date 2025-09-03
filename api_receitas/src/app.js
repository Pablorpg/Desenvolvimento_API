import express from "express"
import cors from "cors"
import { conn } from "./config/sequelize.js"

// ROTAS
import chefeRoute from "./routes/chefeRoute.js"

conn
    .sync()
    .then(() => {
        console.log("Banco de dados está conectado!")
    })
    .catch((error) => console.log(error))

const app = express()

conn.sync()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json())

// USAR/REGISTRAR AS ROTAS
app.use("/api/chefes", chefeRoute)


app.get("/", (request, response) => {
    response.status(200).json({ mensagem: "Olá, Mundo!" })
})

export default app