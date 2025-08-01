import { DataTypes } from "sequelize";
import { conn } from "../conn.js";
import Usuario from "./Usuario.js";
import Postagem from "./Postagem.js";

const Comentario = conn.define(
    "comentarios",
    {
        comentario: {
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
        },
        postagem_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'postagens', // Nome da tabela referenciada
                key: 'id' // Chave primária da tabela referenciada
            }
        }
    },
    {
        tableName: "comentarios",
    }
)

// N:N entre Usuario e Comentario
Usuario.hasMany(Comentario, {
    foreignKey: 'usuario_id', 
    as: 'comentarios'
});
Comentario.belongsTo(Usuario, {
    foreignKey: 'usuario_id', 
    as: 'usuario' 
});

Postagem.hasMany(Comentario, {
    foreignKey: 'postagem_id', 
    as: 'comentarios' 
});
Comentario.belongsTo(Postagem, {
    foreignKey: 'postagem_id', 
    as: 'postagem'
});

export default Comentario;