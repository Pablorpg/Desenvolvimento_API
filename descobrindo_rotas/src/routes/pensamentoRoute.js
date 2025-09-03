import { Router } from "express"
import { paginaInicial } from "../controllers/pensamentosController.js"
import { buscarPensamento, criarPensamento, editarPensamento, excluirPensamento } from "../controllers/pensamentosController.js"

const router = Router()

router.get("/", paginaInicial)
router.get("/buscar/:id", buscarPensamento)
router.post("/criar", criarPensamento)
router.put("/alterar/:id", editarPensamento)
router.delete("/excluir/:id", excluirPensamento)

export default router