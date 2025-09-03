import { Router } from 'express';
import setorModel from '../models/setorModel.js'
import { 
    listarTodosSetores,
    cadastrarSetor,
    buscarSetor,
    atualizarSetor,
    excluirSetor

} from "../controllers/setorController.js"

const router = Router();

router.get("/", listarTodosSetores);

router.post("/", cadastrarSetor);

router.get("/:id", buscarSetor);

router.put("/:id", atualizarSetor);

router.delete("/:id", excluirSetor);

router.get("/setores/:id/tarefas", async (request, response) => {
  const { id } = request.params;

  if (!id) {
    response.status(400).json({ mensagem: "ID inválido" });
    return;
  }

  try {
    const tarefasSetor = await setorModel.findAll({
      where: {
        setor_id: id,
      },
    });
    response.status(200).json(tarefasSetor);
  } catch (error) {
    console.log(error);
    response.status(500).json({ mensagem: "Erro interno ao listar tarefas" });
  }
});

export default router;