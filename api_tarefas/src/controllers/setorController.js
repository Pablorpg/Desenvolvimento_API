import setorModel from "../models/setorModel.js"


export const listarTodosSetores = async (request, response) => {
    try {
        const setores = await setorModel.findAll();
        response.status(200).json(setores);
    } catch (error) {
        console.log(error);
        response.status(500).json({ mensagem: "Erro interno ao listar setores" });
    }
}

export const cadastrarSetor = async (request, response) => {
    const { nome } = request.body;

    if (!nome) {
        response.status(400).json({ mensagem: "O campo é obrigatório" });
        return;
    }

    try {
        const setorCadastrado = await setorModel.create({ nome });
        response.status(201).json({ mensagem: "Setor criado", setorCadastrado });
    } catch (error) {
        console.log(error);
        response.status(500).json({ mensagem: "Erro interno ao listar setores" });
    }
}

export const buscarSetor = async (request, response) => {
    const { id } = request.params;

    if (!id) {
        response.status(400).json({ mensagem: "ID inválido" });
        return;
    }

    try {
        const setorSelecionado = await setorModel.findByPk(id);
        if (!setorSelecionado) {
            response.status(404).json({ mensagem: "Setor não encontrado" });
            return;
        }
        response.status(200).json(setorSelecionado);
    } catch (error) {
        console.log(error);
        response.status(500).json({ mensagem: "Erro interno ao Buscar setor" });
    }
}

export const atualizarSetor = async (request, response) => {
    const { id } = request.params;
    const { nome } = request.body;

    if (!id) {
        response.status(400).json({ mensagem: "ID inválido" });
        return;
    }

    try {
        const setorSelecionado = await setorModel.findByPk(id);
        if (!setorSelecionado) {
            response.status(404).json({ mensagem: "Setor não encontrado" });
            return;
        }

        if (nome !== undefined) {
            setorSelecionado.nome = nome;
        }

        await setorSelecionado.save();
        response.status(200).json({ mensagem: "Setor atualizado" });
    } catch (error) {
        console.log(error);
        response.status(500).json({ mensagem: "Erro interno ao Atualizar setor" });
    }
}
export const excluirSetor = () => {
    async (request, response) => {
    const { id } = request.params;
    if (!id) {
        response.status(400).json({ mensagem: "ID inválido" });
        return;
    }

    try {
        const setorSelecionado = await setorModel.findByPk(id);
        if (!setorSelecionado) {
            response.status(404).json({ mensagem: "Setor não encontrado" });
            return;
        }

        await setorModel.destroy({
            where: { id: setorSelecionado.id },
        });
        response.status(204).send();
    } catch (error) {
        console.log(error);
        response.status(500).json({ mensagem: "Erro interno ao Excluir setor" });
    }
}
}

export const listarTarefaSetor = () => {
    
}