import { DataTypes } from "sequelize";
import { conn } from "./sequelize.js";

const responsavel = conn.define(
    "responsavel",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }
        },
        idade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        senha: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        grau_parentesco: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        endereco: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        dt_nascimento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true
            }
        }

    },
    {
        tableName: "responsavel",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
)

export default responsavel;

