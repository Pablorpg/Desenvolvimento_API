import express from "express";
import cors from "cors";

import { conn } from "./sequelize.js";

import tabelaSetor from "./tabelasetor.js";
import tabelaTarefa from "./tabelaTarefa.js";

const PORT = 3333;

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

//conectar o banco e criar as tabelas
conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor HTTP is running on PORT:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

const logRoutes = (request, response, next) => {
  const { url, method } = request;
  const rota = `[${method.toUpperCase()}]- ${url}`;
  console.log(rota);
  next();
};

//MIDDLEWARE GLOBAL
app.use(logRoutes)

//listarTodas, cadastrar, listaUma, atualizar, excluir
app.get("/tarefas", logRoutes, async (request, response) => {
  try {
    const tarefas = await tabelaTarefa.findAll();
    response.status(200).json(tarefas);
  } catch (error) {
    response.status(500).json({
      mensagem: "Erro interno do servidor ao listar tarefas",
    });
  }
});
app.post("/tarefas", async (request, response) => {
  const { tarefa, descricao, setor_id } = request.body;

  if (!tarefa || tarefa.length < 2) {
    response.status(400).json({
      erro: "Erro no campo tarefa",
      mensagem: "O campo tarefa deve possuir 2 ou mais caracteres",
    });
    return;
  }
  if (!descricao) {
    response.status(400).json({
      erro: "Erro no campo descricao",
      mensagem: "O campo tarefa permite valor nulo",
    });
    return;
  }

  if (!setor_id) {
    response.status(400).json({
      erro: "Erro no campo setor_id",
      mensagem: "O campo setor_id é obrigatório",
    });
    return;
  }

  const novaTarefa = {
    tarefa,
    descricao,
    setor_id
  };

  try {
    const tarefaCadastrada = await tabelaTarefa.create(novaTarefa);
    response.status(201).json(tarefaCadastrada);
  } catch (error) {
    response.status(500).json({
      mensagem: "Erro interno do servidor ao cadastrar tarefa",
    });
  }
});
app.get("/tarefas/:id", async (request, response) => {
  const { id } = request.params;

  if (!id) {
    response.status(400).json({ mensagem: "ID inválido" });
    return;
  }

  try {
    const tarefaSelecionada = await tabelaTarefa.findByPk(id);
    if (!tarefaSelecionada) {
      response.status(404).json({
        erro: "Tarefa não encontrada",
        mensagem: `ID ${id} não existe`,
      });
    }
    response.status(200).json(tarefaSelecionada);
  } catch (error) {
    response.status(500).json({
      mensagem: "Erro interno do servidor ao cadastrar tarefa",
    });
  }
});
app.put("/tarefas/:id", async (request, response) => {
  const { id } = request.params;
  const { tarefa, descricao, situacao, setor_id } = request.body;

  if (!id) {
    response.status(400).json({ mensagem: "ID inválido" });
    return;
  }

  try {
    const tarefaSelecionada = await tabelaTarefa.findByPk(id);
    if (!tarefaSelecionada) {
      response.status(404).json({
        erro: "Tarefa não encontrada",
        mensagem: `ID ${id} não existe`,
      });
    }

    if(tarefaSelecionada.setor_id != setor_id){
      response.status(401).json({
        erro: "Tarefa não atualizada",
        mensagem: `Tarefa não pertence a esse setor`,
      });
      return
    }

    //Atualiza apenas os campos enviados
    console.log(tarefaSelecionada);
    if (tarefa !== undefined) {
      tarefaSelecionada.tarefa = tarefa;
    }
    if (descricao !== undefined) {
      tarefaSelecionada.descricao = descricao;
    }
    if (situacao !== undefined) {
      tarefaSelecionada.situacao = situacao;
    }
    await tarefaSelecionada.save();
    response.status(200).json({
      mensagem: "tarefa atualizada",
      tarefa: tarefaSelecionada,
    });
  } catch (error) {
    response.status(500).json({
      mensagem: "Erro interno do servidor ao cadastrar tarefa",
    });
  }
});

app.delete("/tarefas/:id", async (request, response) => {
  const { id, idSetor } = request.params; //{id: 12321312, nome: ""}
  if (!id) {
    response.status(400).json({ mensagem: "Id inválido" });
    return;
  }

  if (!idSetor) {
    response.status(400).json({ mensagem: "Id do Setor inválido" });
    return;
  }

  try {
    const tarefaSelecionada = await tabelaTarefa.findByPk(id);
    //v: // {id, tarefa, descrição, situação, dt, dt} | F = null
    if (!tarefaSelecionada) {
      response.status(404).json({ mensagem: "tarefa não encontrada" });
      return;
    }
    // DELETE FROM pessas WHERE id = id
    const tarefaDeletada = await tabelaTarefa.destroy({ where: { id: tarefaSelecionada.id, setor_id: idSetor} });
    
    // V=1, F=0/null/undefined 
    if (!tarefaDeletada) {
    response.status(400).json({ mensagem: "Esse setor não excluir a tarefa" });
    return;
  }
  
    response.status(204).send();
  } catch (error) {
    console.log("ERROR: ", error);
    response.status(500).json({
      mensagem: "Erro interno do servidor ao Excluir tarefa",
    });
  }
});

//*********** SETORES ***********/
app.get("/setores", async (request, response) => {
  try {
    const setores = await tabelaSetor.findAll();
    response.status(200).json(setores);
  } catch (error) {
    console.log(error)
    response.status(500).json({
      mensagem: "Erro interno do servidor ao listar setores",
    });
  }
});

app.post("/setores", async (request, response) => {
  const { nome } = request.body;

  if (!nome || nome.length < 2 && nome.length > 100) {
    response.status(400).json({
      mensagem: "O campo nome deve possuir 2 ou mais caracteres",
    });
    return;
  }

  try {
    const setorCadastrado = await tabelaSetor.create({nome});
    response.status(201).json({
      mensagem: "Setor criado",setorCadastrado
    });
  } catch (error) {
    response.status(500).json({
      mensagem: "Erro interno do servidor ao cadastrar setor",
    });
  }
});

app.get("/setores/:id", async (request, response) => {
  const { id } = request.params;
  if (!id) {
    response.status(400).json({ mensagem: "ID inválido" });
    return;
  }
  try {
    const setorSelecionado = await tabelaSetor.findByPk(id);
    if (!setorSelecionado) {
      response.status(404).json({
        mensagem: `Setor não encontrado`
      });
      return;
    }
    response.status(200).json(setorSelecionado);
  } catch (error) {
    console.log(error)
    response.status(500).json({
      mensagem: "Erro interno do servidor ao listar setor",
    });
  }
});

app.put("/setores/:id", async (request, response) => {
  const { id } = request.params;
  const { nome } = request.body;
  if (!id) {
    response.status(400).json({ mensagem: "ID inválido" });
    return;
  }
  try {
    const setorSelecionado = await tabelaSetor.findByPk(id);
    if (!setorSelecionado) {
      response.status(404).json({
        mensagem: `Setor não encontrado`,
      });
      return;
    }
    if (nome !== undefined) {
      setorSelecionado.nome = nome;
    }

    await setorSelecionado.save();
    response.status(200).json({
      mensagem: "Setor atualizado"
    });
  } catch (error) {
    console.log(error)
    response.status(500).json({
      mensagem: "Erro interno do servidor ao atualizar setor",
    });
  }
});

app.delete("/setores/:id", async (request, response) => {
  const { id } = request.params;
  if (!id) {
    response.status(400).json({ mensagem: "Id inválido" });
    return;
  }
  try {
    const setorSelecionado = await tabelaSetor.findByPk(id);
    if (!setorSelecionado) {
      response.status(404).json({ mensagem: "Setor não encontrado" });
      return;
    }
    await tabelaSetor.destroy({ 
      where: { id: setorSelecionado.id } });
    response.status(204).send();
  } catch (error) {
    console.log(error);
    response.status(500).json({
      mensagem: "Erro interno do servidor ao Excluir setor",
    });
  }
});

//*********** FEATURES ***********/
// Listar todas a tarefa pendentes/Consluídas
app.get("/tarefas/situacao/:situacao", async (request, response) => {
  const { situacao } = request.params;
  if (!situacao || (situacao !== "pendente" && situacao !== "concluida")) {
    response.status(400).json({ mensagem: "Situação inválida" });
    return;
  }
  try {
    const tarefas = await tabelaTarefa.findAll({
      where: { situacao },
    });
    response.status(200).json(tarefas);
  } catch (error) {
    response.status(500).json({
      mensagem: "Erro interno do servidor ao listar tarefas por situação",
    });
  }
});

app.get("/setores/:id/tarefas", async (request, response) => {
  const { id } = request.params;
  if (!id) {
    response.status(400).json({ mensagem: "ID inválido" });
    return;
  }
  try {
    const setorSelecionado = await tabelaSetor.findByPk(id);
    if (!setorSelecionado) {
      response.status(404).json({
        erro: "Setor não encontrado",
        mensagem: `ID ${id} não existe`,
      });
      return;
    }
    const tarefasDoSetor = await tabelaTarefa.findAll({
      where: { setorId: id },
    });
    response.status(200).json(tarefasDoSetor);
  } catch (error) {
    response.status(500).json({
      mensagem: "Erro interno do servidor ao listar tarefas do setor",
    });
  }
});

app.use((request, response) => {
  response.status(404).json({ mensagem: "Rota não encontrada" });
});
