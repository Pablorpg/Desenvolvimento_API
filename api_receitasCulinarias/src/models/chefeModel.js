import { DataTypes } from "sequelize";

const autorModel = conn.define(
    "autores",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        biografia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        especialidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experiencia: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        nacionalidade: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: true,
        tableName: 'autores',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default autorModel