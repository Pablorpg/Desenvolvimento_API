import { DataTypes } from "sequelize";
import { conn } from "./sequelize.js";

const aluno = conn.define("aluno", {
    ra: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsavelId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

export default aluno;