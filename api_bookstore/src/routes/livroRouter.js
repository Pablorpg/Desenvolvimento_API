import { Router } from "express";
import { cadastrarLivro, listarTodosLivros, buscarLivro, AtualizarLivro, DeletarLivro, cadastrarCapaLivro } from "../controllers/livrosController.js";

// midlewares
import { imageUpload } from "../middleware/imageUpload.js";

const router = Router()

router.post("/", cadastrarLivro)
router.get("/", listarTodosLivros)
router.get("/:id", buscarLivro)
router.put("/:id", AtualizarLivro)
router.delete("/:id", DeletarLivro)

// ROTAS DAS IMAGENS
router.post("/:id/imagem", imageUpload.single('imagem'), cadastrarCapaLivro)

export default router;