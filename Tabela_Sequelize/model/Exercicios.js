import { DataTypes } from "sequelize";
import { conn } from "../conn.js";

const Execicios = conn.define(
    "exercicios",
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grupo_muscular: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        exercicios_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        tableName: "exercicios",
    }
)

export default Execicios;