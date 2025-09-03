import { autorModel, livroModel } from "../models/association.js"

export const cadastrarLivro = async (request, response) => {
    const { titulo, isbn, descricao, ano_publicacao, genero, quantidadeTotal, quantidadeDisponivel, autores } = request.body

    if (!titulo) {
        response.status(400).json({ message: "O campo titulo não pode ser vazio." })
        return
    }

    if (!isbn) {
        response.status(400).json({ message: "O campo isbn não pode ser vazio." })
        return
    }

    if (!descricao) {
        response.status(400).json({ message: "O campo descricao não pode ser vazio." })
        return
    }

    if (!ano_publicacao) {
        response.status(400).json({ message: "O campo ano_publicacao não pode ser vazio." })
        return
    }

    if (!genero) {
        response.status(400).json({ message: "O campo genero não pode ser vazio." })
        return
    }

    if (!quantidadeTotal) {
        response.status(400).json({ message: "O campo quantidadeTotal não pode ser vazio." })
        return
    }

    if (!quantidadeDisponivel) {
        response.status(400).json({ message: "O campo quantidadeDisponivel não pode ser vazio." })
    }

    if (!Array.isArray(autores) || autores.length === 0) {
        response.status(400).json({ message: "O campo autores deve ser array e possui pelos menos um autor" })
        return
    }

    try {
        const autoresEncontrados = await autorModel.findAll({
            where: {
                id: autores
            }
        })

        if (autoresEncontrados.length !== autores.length) {
            response.status(404).json({
                mensagem: "Um ou mais IDs de autores são inválidos ou não existe"
            })
            return
        }

        const livro = await livroModel.create({
            titulo, isbn, descricao, ano_publicacao, genero, quantidadeTotal, quantidadeDisponivel
        })
        await livro.addAutores(autores)

        const livroComAutor = await livroModel.findByPk(livro.id, {
            attributes: { exclude: ["created_at", "update_at"] },
            include: {
                model: autorModel,
                attributes: { exclude: ["created_at", "update_at"] },
                through: { attributes: [] }

            }
        })
        response.status(200).json({ mensagem: "Livro cadastrado" })
    } catch (error) {
        console.log(error)
    }

}

export const listarTodosLivros = async (request, response) => {
    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 10
    const offset = (page - 1) * limit

    try {
        const livro = await livroModel.findAndCountAll({
            include: {
                model: autorModel,
                through: { attributes: [] }
            },
            limit,
            offset
        })

        const livrosFormatados = livro.rows.map((livro) => {
            return {
                id: livro.id,
                titulo: livro.titulo,
                isbn: livro.isbn,
                descricao: livro.descricao,
                ano_publicacao: livro.ano_publicacao,
                genero: livro.genero,
                quantidade_total: livro.quantidade_total,
                quantidade_disponive: livro.quantidade_disponive,
                autores: livro.autores.map((autor) => ({
                    id: autor.id,
                    nome: autor.nome
                }))
            }
        })

        const totalDePaginas = Math.ceil(livro.count / limit)
        response.status(200).json({
            totalLivros: livro.count,
            totalPaginas: totalDePaginas,
            paginaAtual: page,
            livrosPorPagina: limit,
            livros: livrosFormatados

        })
    } catch (error) {

    }
}

export const buscarLivro = async (request, response) => {
    const { id } = request.params
    if (!id) {
        response.status(400).json({ mensagem: " Id obrigatorio" })
        return
    }

    try {
        const livro = await livroModel.findByPk(id, {
            attributes: { exclude: ["created_at", "updated_at"] },
            include: {
                model: autorModel,
                through: { attributes: [] },
                attributes: { exclude: ["created_at", "updated_at"] }
            },
        })

        if (!livro) {
            response.status(404).json({ mensagem: "Livro não encontrado" })
            return
        }

        response.status(200).json(livro)
    } catch (error) {

    }
}

export const AtualizarLivro = async (request, response) => {
    try {
        const { id } = request.params
        const { titulo, isbn, descricao, ano_publicacao, genero, quantidadeTotal, quantidadeDisponivel, autores } = request.body
        const Atualizar = await livroModel.findByPk(id)

        if (Atualizar) {
            Atualizar.titulo = titulo
            Atualizar.isbn = isbn
            Atualizar.descricao = descricao
            Atualizar.ano_publicacao = ano_publicacao
            Atualizar.genero = genero
            Atualizar.quantidadeTotal = quantidadeTotal
            Atualizar.quantidadeDisponivel = quantidadeDisponivel
            Atualizar.autores = autores
            await Atualizar.save()
            response.status(200).json({ message: `Livro: ${titulo}, foram atualizadas.`, Atualizar })
            return
        } else {
            response.status(404).json({ message: "Livro não encontrado!" })
        }

    } catch (error) {
        response.status(500).json({ mensagem: "Erro interno ao listar livros.", error: error.message })
    }
}

export const DeletarLivro = async (request, response) => {
    try {
        const { id } = request.params
        const Deletar = await livroModel.findByPk(id)
        if (Deletar) {
            await Deletar.destroy()
            response.status(204).send()
            return
        } else {
            response.status(404).json({ message: 'Livro não encontrado!' })
        }
    } catch (error) {
        response.status(500).json({ mensage: "Erro interno ao listar Livros.", error: error.message })
    }
}

// Controladores das rotas de imagens
export const cadastrarCapaLivro = async (request, response) => {
    const { id } = request.params
    const { filename, path } = request.file

    if(!id){
        response.status(400).json({mensagem: "O Id é obrigatório"})
        return
    }

    try {
        const livro = await livroModel.findByPk(id)

        if(!livro){
            response.status(404).json({mensagem: "Livro não existe"})
            return
        }

        livro.imagem_capa = filename
        livro.imagem_capa = path
        await livro.save()

        response.status(200).json({mensagem: "Capa cadastrada", livro})

    } catch (error) {
        console.log(error)
        response.status(500).json({mensagem: "Erro interno aocadastrar capa"})
    }

}