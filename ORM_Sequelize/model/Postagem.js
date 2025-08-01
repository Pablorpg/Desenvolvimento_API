import { DataTypes } from "sequelize";
import { conn } from "../conn.js";
import Usuario from "./Usuario.js";

const Postagem = conn.define(
    "postagens",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario, 
                key: 'id' 
            }
        }
    },
    {
        tableName: "postagens",
    }
)

// Associação(Relacionamento) de 1:N entre Usuario e Postagem
Usuario.hasMany(Postagem, {
    foreignKey: 'usuario_id', 
    as: 'postagens' 
});
Postagem.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario'
});

export default Postagem;