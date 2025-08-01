import { DataTypes } from "sequelize";
import { conn } from "../conn.js";
import Execicios from "./Exercicios.js";
import TreinoExercicio from "./TreinoExercicio.js";


const Treinos = conn.define(
  "treino",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dt_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nome_personal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aluno_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    treinos_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "treino",
  }
);

Treinos.belongsToMany(Execicios, {
  through: TreinoExercicio,
  foreignKey: "treino_id",
});

Execicios.belongsToMany(Treinos, {
  through: TreinoExercicio,
  foreignKey: "exercicio_id",
});


export default Treinos;