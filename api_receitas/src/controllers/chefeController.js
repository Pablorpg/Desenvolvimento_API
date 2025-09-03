
import chefeModel from "../models/chefeModel.js"

export const cadastroDeChefs = async (request, response) => {
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

    if (!especialidade) {
        response.status(400).json({
            erro: "Campo biografia inválido",
            mensagem: "O campo biografia não pode ser nulo"
        })
        return
    }

    if (!experiencia) {
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

    try {
        const { nome, biografia, especialidade, experiencia, nacionalidade } = request.body;
        const newTask = await chefeModel.create({ nome, biografia, especialidade, experiencia, nacionalidade });
        response.status(201).json(newTask);
    } catch (error) {
        console.log(error)
        response.status(400).json({ message: 'Erro ao criar a tarefa', error: error.message });
    }
}

