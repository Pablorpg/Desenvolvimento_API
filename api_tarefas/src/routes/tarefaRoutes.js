import { Router } from 'express'
import setorModel from "../models/setorModel.js"
import tarefaModel from "../models/tarefaModel.js"

const router = Router()

router.get("/tarefas", async (request, response) => {
  try {
    const tarefas = await tarefaModel.findAll();
    response.status(200).json(tarefas);
  } catch (error) {
    response.status(500).json({
      mensagem: "Erro interno do servidor ao listar tarefas",
    });
  }
});
router.post("/tarefas", async (request, response) => {
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
    setor_id,
  };

  try {
    const tarefaCadastrada = await tarefaModel.create(novaTarefa);
    response.status(201).json(tarefaCadastrada);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      mensagem: "Erro interno do servidor ao cadastrar tarefa",
    });
  }
});
router.get("/tarefas/:id", async (request, response) => {
  const { id } = request.params;

  if (!id) {
    response.status(400).json({ mensagem: "ID inválido" });
    return;
  }

  try {
    const tarefaSelecionada = await tarefaModel.findByPk(id);
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
router.put("/tarefas/:id", async (request, response) => {
  const { id } = request.params;
  const { tarefa, descricao, situacao, setor_id } = request.body;

  if (!id) {
    response.status(400).json({ mensagem: "ID inválido" });
    return;
  }

  try {
    const tarefaSelecionada = await tarefaModel.findByPk(id);
    if (!tarefaSelecionada) {
      response.status(404).json({
        erro: "Tarefa não encontrada",
        mensagem: `ID ${id} não existe`,
      });
    }

    if (tarefaSelecionada.setor_id != setor_id) {
      response.status(401).json({
        erro: "Tarefa não atualizada",
        mensagem: `Tarefa não pertence a esse setor`,
      });
      return;
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
router.delete("/tarefas/:id/:idSetor", async (request, response) => {
  const { id, idSetor } = request.params; //{id: 12321312, nome: ""}
  if (!id) {
    response.status(400).json({ mensagem: "Id da tarefa inválido" });
    return;
  }
  if (!idSetor) {
    response.status(400).json({ mensagem: "Id do setor inválido" });
    return;
  }

  try {
    const tarefaSelecionada = await tarefaModel.findByPk(id);
    //v: // {id, tarefa, descrição, situação, dt, dt} | F = null
    if (!tarefaSelecionada) {
      response.status(404).json({ mensagem: "tarefa não encontrada" });
      return;
    }
    // DELETE FROM pessas WHERE id = id
    const tarefaDeletada = await tarefaModel.destroy({
      where: { id: tarefaSelecionada.id, setor_id: idSetor },
    });
    // V=1, F=0/null/undefined
    if (!tarefaDeletada) {
      response
        .status(401)
        .json({ mensagem: "Esse setor não excluir a tarefa" });
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

router.get("/situacao/:situacao", async (request, response) => {
  const situacao = request.params.situacao;
  if (!situacao) {
    response.status(400).json({ mensagem: "situação inválida" });
  }

  try {
    const tarefas = await tarefaModel.findAll({
      where: {
        situacao,
      },
    });

    response.status(200).json(tarefas);
  } catch (error) {
    console.log(error);
    response.status(500).json({ mensagem: "Erro interno ao listar tarefas" });
  }
});

export default router