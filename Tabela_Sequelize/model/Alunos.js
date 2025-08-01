import { DataTypes } from "sequelize";
import { conn } from "../conn.js";
import Treinos from "./Treinos.js";

const Alunos = conn.define(
  "alunos",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    alunos_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "alunos",
  }
);

Alunos.hasMany(Treinos, {
  foreignKey: "aluno_id"
});

Treinos.belongsTo(Alunos, {
  foreignKey: "aluno_id",
});

export default Alunos;