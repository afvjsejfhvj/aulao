import express from "express"
import pg from 'pg'
import cors from 'cors'

const { Pool } = pg

const server = express();
server.use(express.json())

// faz conexao com o banco

const sql = new Pool({
    host: 'localhost',
    user: 'local',
    password: '12345',
    database: 'gerenciamento',
    port: 5432
})

server.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

server.get('/usuario', async (req, res) => {
    try {
        const response = await sql.query('SELECT * FROM usuario')
        return res.json({ results: response.rows, ok: true })
    } catch (error) {
        res.status(500).json({ message: error, ok: false })
    }
})

server.post('/usuario', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    try {
        const response = await sql.query(
            'INSERT INTO usuario (name, email) VALUES ($1, $2)',
            [name, email]
        )
        res.status(201).json({ message: 'usuario criado com sucesso', ok: true })
    } catch (error) {
        res.status(500).json({ message: error, ok: false })
    }

    return res.send('usuario cadastrado com sucesso!')
})

server.get('/tarefas', async (req, res) => {
    try {
        const response = await sql.query('SELECT * FROM tarefas')
        return res.json({ results: response.rows, ok: true })
    } catch (error) {
        res.status(500).json({ message: error, ok: false })
    }
})

server.post('/tarefas', async (req, res) => {
    const id_usuario = req.body.id_usuario
    const setor = req.body.setor;
    const data_tarefa = req.body.data_tarefa;
    const status = req.body.status;
    const prioridade = req.body.prioridade;


    try {
        const response = await sql.query(
            'INSERT INTO tarefas (id_usuario, setor, data_tarefa, status, prioridade ) VALUES ($1, $2, $3, $4, $5)',
            [id_usuario, setor, data_tarefa, status, prioridade ]
        )
        res.status(201).json({ message: 'sucesso', ok: true })
    } catch (error) {
        res.status(500).json({ message: error, ok: false })
    }

    return res.send('terefa cadastrado com sucesso!')
})

// server.post('/login', async (req, res) => {

//     const email = req.body.email;
//     const password = req.body.password;

//     try {
//         const response = await sql.query(
//             'SELECT * FROM users WHERE email = $1 AND password = $2',
//             [email, password]
//         )

//         if(response.rows.length === 0){
//             res.status(200).json({message:'usuario nao encontrado'})
//         }

        

//         res.status(201).json({ message: 'Usuario logado com sucesso', ok: true })
//     } catch (error) {
//         res.status(500).json({ message: error, ok: false })
//     }

//     return res.send('usuario cadastrado com sucesso!')
// })

server.listen(3000, () => {
    console.log('tá rodando: http://localhost:3000/')
})