import { Router } from "express"
import { cadastrarAutor, listarTodosAutores, buscarAutorPorId, AtualizarAutor, DeletarAutor } from "../controllers/autorController.js"

const router = Router( )

router.post("/", cadastrarAutor)
router.get("/", listarTodosAutores)
router.get("/:id", buscarAutorPorId)
router.put("/:id", AtualizarAutor)
router.delete("/:id", DeletarAutor)

export default router