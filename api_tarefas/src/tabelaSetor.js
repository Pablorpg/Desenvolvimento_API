import { DataTypes } from "sequelize";
import { conn } from "./sequelize.js"

const tabelaSetor = conn.define(
    "setores",
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }
        }
    },
    {   
        timestamps: true,
        tableName: 'setores',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)

export default tabelaSetor;