import { DataTypes } from "sequelize";
import { conn } from "../conn.js";

const Usuario = conn.define(
    "usuarios",
    {
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        passoword: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    },
    {
        tableName: "usuarios",
    }
)

export default Usuario;