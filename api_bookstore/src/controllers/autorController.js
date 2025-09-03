import autorModel from "../models/autorModel.js"

export const cadastrarAutor = async (request, response) => {
    const { nome, biografia, data_nascimento, nacionalidade } = request.body

    if (!nome) {
        response.status(400).json({
            erro: "Campo nome inválido",
            mensagem: "O campo nome não pode ser nulo"
        })
        return
    }

    if (!biografia) {
        response.status(400).json({
            erro: "Campo biografia inválido",
            mensagem: "O campo biografia não pode ser nulo"
        })
        return
    }

    if (!data_nascimento) {
        response.status(400).json({
            erro: "Campo data_nascimento inválido",
            mensagem: "O campo data_nascimento não pode ser nulo"
        })
        return
    }

    if (!nacionalidade) {
        response.status(400).json({
            erro: "Campo nacionalidade inválido",
            mensagem: "O campo nacionalidade não pode ser nulo"
        })
        return
    }

    // Verdaderio data | falso: Invalid Date
    const validaData = new Date(data_nascimento)
    if (validaData == 'Invalid Date') {
        response.status(400).json({
            erro: "Data inválida",
            mensagem: "Formato inválido"
        })
        return
    }

    const autor = {
        nome,
        biografia,
        data_nascimento,
        nacionalidade
    }

    try {
        const novoAutor = await autorModel.create(autor)
        response
            .status(201)
            .json({ mensagem: "Autor criado com sucesso", novoAutor })
    } catch (error) {
        console.error(error)
        response.status(500).json({ mensagem: "Erro interno ao cadastrar autor" })
    }
}

export const listarTodosAutores = async (request, response) => {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const autores = await autorModel.findAndCountAll({
            offset,
            limit
        })

        const totalPaginas = Math.ceil(autores.count / limit)
        response.status(200).json({
            totalAutores: autores.count,
            totalPaginas,
            paginaAtual: page,
            autoresPorPagina: limit,
            autores: autores.rows
        })

        console.log("Total autores:", autores.count);
        console.log("Autores:", autores.rows);
    } catch (error) {
        console.log(error)
        response.status(500).json({ mensagem: "Erro interno ao listar autores." })
    }
};

export const buscarAutorPorId = async (request, response) => {
    try {
        const { id } = request.params
        const buscarAutor = await autorModel.findByPk(id)
        if (buscarAutor) {
            response.status(200).json(buscarAutor)
            return
        } else {
            response.status(404).json({ message: "Autor não encontrado" })
        }
    } catch (error) {
        response.status(500).json({ mensagem: "Erro interno ao listar autores.", error: error.message })
    }
}

export const AtualizarAutor = async (request, response) => {
    try {
        const { id } = request.params
        const { nome, biografia, data_nascimento, nacionalidade } = request.body
        const Atualizar = await autorModel.findByPk(id)

        if (Atualizar) {
            Atualizar.nome = nome
            Atualizar.biografia = biografia
            Atualizar.data_nascimento = data_nascimento
            Atualizar.nacionalidade = nacionalidade
            await Atualizar.save()
            response.status(200).json({ message: `Autor: ${nome}, suas informações foram atualizadas.`, Atualizar })
            return
        } else {
            response.status(404).json({ message: "Autor não encontrado!" })
        }
    } catch (error) {
        response.status(500).json({ mensagem: "Erro interno ao listar autores.", error: error.message })
    }
}

export const DeletarAutor = async (request, response) => {
    try {
        const { id } = request.params
        const Deletar = await autorModel.findByPk(id)
        if (Deletar) {
            await Deletar.destroy()
            response.status(204).send()
            return
        } else {
            response.status(404).json({ message: 'Autor não encontrado!' })
        }
    } catch (error) {
        response.status(500).json({ mensage: "Erro interno ao listar autores.", error: error.message })
    }
}