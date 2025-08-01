import { DataTypes } from "sequelize";
import { conn } from "../conn.js";

const TreinoExercicio = conn.define(
    "treino_exercicio",
    {   
        repeticaos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        serie: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ordem: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        treino_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        exercicio_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "treino_exercicio",
    }
);

export default TreinoExercicio;