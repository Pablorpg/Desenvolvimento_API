import { Sequelize } from "sequelize";

export const conn = new Sequelize("escola1", "root", "123456789", {
    host: "localhost",
    dialect: "mysql",
    port: "3306"
})
