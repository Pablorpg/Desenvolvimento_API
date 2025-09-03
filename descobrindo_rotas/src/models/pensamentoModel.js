import { DataTypes } from "sequelize"
import { conn } from "../config/sequelize.js"

const pensamento = conn.define(
    "pensamento",
    {   
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true,
        tableName: 'pensamento',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

export default pensamento