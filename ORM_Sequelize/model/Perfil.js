import { DataTypes } from "sequelize";
import { conn } from "../conn.js";
import Usuario from "./Usuario.js";

const Perfil = conn.define(
    "perfis",
    {
        avatar_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario, // Nome da tabela referenciada
                key: 'id' // Chave primária da tabela referenciada
            }
        }
    },
    {
        tableName: "perfis",
    }
)

// Associação de 1:1 entre Usuario e Perfil

// Usuario.temUm(Perfil)
Usuario.hasOne(Perfil, {
    foreignKey: 'usuario_id', // Chave estrangeira na tabela Perfil
    as: 'perfil' // Alias para a associação
});

// Perfil.pertenceA(Usuario)
Perfil.belongsTo(Usuario , {
    foreignKey: 'usuario_id', // Chave estrangeira na tabela Perfil
    as: 'usuario' // Alias para a associação
});

export default Perfil;