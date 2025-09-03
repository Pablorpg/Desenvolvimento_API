import { Router } from "express";
import { cadastrarLivro, listarTodosLivros, buscarLivro, AtualizarLivro, DeletarLivro } from "../controllers/livrosController.js";

const router = Router()

router.post("/", cadastrarLivro)
router.get("/", listarTodosLivros)
router.get("/:id", buscarLivro)
router.put("/:id", AtualizarLivro)
router.delete("/:id", DeletarLivro)

export default router;