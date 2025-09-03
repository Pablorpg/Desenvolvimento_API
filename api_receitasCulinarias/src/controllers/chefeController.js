import chefeModel from "../models/chefeModel.js"

export const criarChef = async (req, res) => {
    const { nome, biografia, especialidade, experiencia, nacionalidade } = req.body
    const novoChef = await chefeModel.create({ nome, biografia, especialidade, experiencia, nacionalidade })
    res.status(201).json(novoChef)
}

export const listarChefs = async (req, res) => {
    const chefs = await chefeModel.findAll()
    res.json(chefs)
};

export const buscarChefPorId = async (req, res) => {
    const { id } = req.params
    const chef = await chefeModel.findByPk(id)
    res.json(chef)
}


export const atualizarChef = async (req, res) => {
    const { id } = req.params
    const { nome, biografia, especialidade, experiencia, nacionalidade } = req.body
    await chefeModel.update({ nome, biografia, especialidade, experiencia, nacionalidade }, { where: { id } })
    const chefAtualizado = await chefeModel.findByPk(id)
    res.json(chefAtualizado)
}

export const deletarChef = async (req, res) => {
    const { id } = req.params
    await chefeModel.destroy({ where: { id } })
    res.status(204).send()
}