import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

const livroModel = conn.define(
  "livros",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano_publicacao: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantidadeTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidadeDisponivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "livros",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "update_at",
  }
);

export default livroModel