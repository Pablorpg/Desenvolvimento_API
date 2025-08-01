import { Sequelize } from "sequelize";

export const conn = new Sequelize({
    dialect: "sqlite", // Qual o banco de dados
    storage: "./dev.sqlite", // Onde está o arquivo do banco de dados
})