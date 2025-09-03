import express from "express";
import cors from "cors";
import { conn } from "./sequelize.js";
import aluno from "./aluno.js";
import responsavel from "./responsavel.js";

responsavel.hasMany(aluno, {
    foreignKey: "responsavelId",
    as: "alunos"
});

aluno.belongsTo(responsavel, {
    foreignKey: "responsavelId",
    as: "responsavel"
});

const PORT = 3333;
const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

conn
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor funcionando na porta:${PORT}`);
        });
    })
    .catch((error) => console.log(error));


const logRoutes = (request, response, next) => {
    const { url, method } = request;
    const rota = `[${method.toUpperCase()}]- ${url}`;
    console.log(rota);
    next();
};

app.use(logRoutes);


app.get("/aluno", async (req, res) => {
    try {
        const alunos = await aluno.findAll();
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro interno ao buscar alunos." });
    }
});

app.post("/aluno", async (req, res) => {
    try {
        const { ra, nome, email } = req.body;
        if (!ra || !nome || !email) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
        }

        const alunoExistente = await aluno.findOne({ where: { ra } });
        if (alunoExistente) {
            return res.status(409).json({ erro: "RA já cadastrado." });
        }

        const novoAluno = await aluno.create({ ra, nome, email });
        res.status(201).json(novoAluno);
    } catch (error) {
        res.status(400).json({ erro: "Não foi possível cadastrar o aluno." });
    }
});

app.get("/aluno/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const alunoEncontrado = await aluno.findByPk(id);
        if (!alunoEncontrado) {
            return res.status(404).json({ mensagem: "Aluno não encontrado." });
        }
        res.json(alunoEncontrado);
    } catch (error) {
        res.status(400).json({ erro: "Não foi possível buscar o aluno." });
    }
});

app.put("/aluno/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { ra, nome, email } = req.body;
        const alunoAtualizar = await aluno.findByPk(id);

        if (!alunoAtualizar) {
            return res.status(404).json({ mensagem: "Aluno não encontrado." });
        }
        await alunoAtualizar.update({ ra, nome, email });
        res.json(alunoAtualizar);
    } catch (error) {
        res.status(400).json({ erro: "Não foi possível atualizar o aluno." });
    }
});

app.delete("/aluno/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const alunoDeletar = await aluno.findByPk(id);

        if (!alunoDeletar) {
            return res.status(404).json({ mensagem: "Aluno não encontrado." });
        }
        await alunoDeletar.destroy();
        res.json({ mensagem: "Aluno deletado." });
    } catch (error) {
        res.status(400).json({ mensagem: "Não foi possível deletar o aluno." });
    }
});


app.put("/aluno/:id/responsavel/:responsavelId", async (req, res) => {
    try {
        const { id, responsavelId } = req.params;
        const alunoAtualizar = await aluno.findByPk(id);
        if (!alunoAtualizar) return res.status(404).json({ mensagem: "Aluno não encontrado." });

        const r = await responsavel.findByPk(responsavelId);
        if (!r) return res.status(404).json({ mensagem: "Responsável não encontrado." });

        alunoAtualizar.responsavelId = responsavelId;
        await alunoAtualizar.save();

        res.json({ mensagem: "Aluno vinculado ao responsável." });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao vincular aluno." });
    }
});


app.get("/responsavel", async (req, res) => {
    try {
        const lista = await responsavel.findAll();
        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro interno ao buscar responsáveis." });
    }
});

app.post("/responsavel", async (req, res) => {
    try {
        const novo = await responsavel.create(req.body);
        res.status(201).json(novo);
    } catch (error) {
        res.status(400).json({ mensagem: "Não foi possível cadastrar o responsável." });
    }
});

app.get("/responsavel/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const r = await responsavel.findByPk(id, {
            include: { model: aluno, as: "alunos" }
        });
        if (!r) return res.status(404).json({ mensagem: "Responsável não encontrado." });
        res.json(r);
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao buscar responsável." });
    }
});

app.put("/responsavel/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const r = await responsavel.findByPk(id);
        if (!r) return res.status(404).json({ mensagem: "Responsável não encontrado." });

        await r.update(req.body);
        res.json(r);
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao atualizar responsável." });
    }
});

app.delete("/responsavel/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const r = await responsavel.findByPk(id);
        if (!r) return res.status(404).json({ mensagem: "Responsável não encontrado." });

        await r.destroy();
        res.json({ mensagem: "Responsável deletado." });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao deletar responsável." });
    }
});