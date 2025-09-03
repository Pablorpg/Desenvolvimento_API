
import pensamento from "../models/pensamentoModel.js"

export const paginaInicial = async (request, response) => {
    try {
        const pensamentos = await pensamento.findAll({
            attributes: ['nome', 'email']
        })

        response.status(200).json(pensamentos);
    } catch (error) {
        console.log(error);
        response.status(500).json({ mensagem: "Erro interno ao listar pensamentos" })
    }
}

export const buscarPensamento = async (request, response) => {
    try {
        const { id } = request.params
        const buscarPensamento = await pensamento.findByPk(id)
        if (buscarPensamento) {
            response.status(200).json(buscarPensamento)
            return
        } else {
            response.status(404).json({ message: "Conteúdo não encontrado" })
        }
    } catch (error) {
        response.status(500).json({ mensagem: "Erro interno ao mostrar conteúdo.", error: error.message })
    }
}

export const criarPensamento = async (request, response) => {
    try {
        const { nome, email } = request.body;

        if (!nome) {
            response.status(400).json({ message: "O campo 'nome' é obrigatório." });
            return;
        }

        if (!email) {
            response.status(400).json({ message: "O campo 'nome' é obrigatório." });
            return;
        }

        if (!email == email) {
            response.status(400).json({ message: "Não pode ser o mesmo email." });
            return;
        }

        const novoConteudo = await pensamento.create({ nome, email });
        response.status(201).json(novoConteudo);
    } catch (error) {
        console.log(error);
        response.status(400).json({ message: 'Erro ao criar o conteúdo', error: error.message });
    }
}

export const editarPensamento = async (request, response) => {
    try {
        const { id } = request.params
        const { nome } = request.body
        const Atualizar = await pensamento.findByPk(id)

        if (!nome) {
            response.status(400).json({ message: "O campo 'nome' é obrigatório." });
            return;
        }

        if (Atualizar) {
            Atualizar.nome = nome
            await Atualizar.save()
            response.status(200).json({ message: "Informações foram atualizadas.", Atualizar })
            return
        } else {
            response.status(404).json({ message: "Informações não encontrado!" })
        }
    } catch (error) {
        response.status(500).json({ mensagem: "Erro interno ao fazer alterações.", error: error.message })
    }
}

export const excluirPensamento = async (request, response) => {
  try {
    const { id } = request.params
    const apagar = await pensamento.findByPk(id)

    if (apagar) {
      await apagar.destroy()
      response.status(204).json({message: "Informações apagadas!"}).end()
    } else {
      response.status(404).json({ message: 'Informações não encontradas' })
    }
  } catch (error) {
    response.status(500).json({ message: 'Erro ao deletar informações', error: error.message })
  }
}
