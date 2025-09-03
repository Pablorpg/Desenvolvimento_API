
import express from "express"
import cors from "cors"
import sequelize from './config/database.js'
import Task from './models/Task.js'

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

try {
    await sequelize.authenticate()
    sequelize.sync()
    console.log('Conexão com o banco de dados estabelecida sucesso.')
} catch (error) {
    console.error('Nçao foi possível conectar com o banco de dados:', error)
}

app.get('/', (req, res) => {
    res.send('API CRUD está no ar e funcionando!')
})

app.post('/tasks', async (request, response) => {
    try {
        const { title, description, completed } = request.body;
        const newTask = await Task.create({ title, description, completed });
        response.status(201).json(newTask);
    } catch (error) {
        console.log(error)
        response.status(400).json({ message: 'Erro ao criar a tarefa', error: error.message });
    }
})

app.get('/tasks', async (request, response) => {
    try {
        const tasks = await Task.findAll()
        response.status(200).json(tasks)
    } catch (error) {
        response.status(400).json({ message: 'Erro ao buscar tarefas', error: error.message })
    }
})

app.get('/tasks/:id', async (request, response) => {
    try {
        const { id } = request.params
        const task = await Task.findByPk(id)
        if (task) {
            response.status(200).json(task)
        } else {
            response.status(404).json({ message: 'Tarefa não encontrada' })
        }
    } catch (error) {
        response.status(500).json({ message: 'Erro ao buscar a tarefa', error: error.message })
    }
})

app.put('/tasks/:id', async (request, response) => {
    try {
        const { id } = request.params
        const { title, description, completed } = request.body
        const task = await Task.findByPk(id)
        if (task) {
            task.title = title
            task.description = description
            task.completed = completed
            await task.save()
            response.status(200).json(task)
        } else {
            response.status(404).json({ message: 'Tarefa não encontrada' })
        }
    } catch (error) {
        response.status(400).json({ message: 'Erro ao atualizar a tarefa', error: error.message })
    }
})

app.delete('/tasks/:id', async (request, response) => {
    try {
        const { id } = request.params
        const task = await Task.findByPk(id)
        if (task) {
            await task.destroy()
            response.status(204).send()
        } else {
            response.status(404).json({ message: 'Tarefa não encontrada' })
        }
    } catch (error) {
        response.status(500).json({ message: 'Erro ao deletar tarefa', error: error.message })
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost: ${port}`)
})