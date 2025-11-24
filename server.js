import express, { response } from "express"
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
    database: 'chamados',
    port: 5432
})

server.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

server.get('/users', async (req, res) => {
    try {
        const response = await sql.query('SELECT * FROM users')
        return res.json({ results: response.rows, ok: true })
    } catch (error) {
        res.status(500).json({ message: error, ok: false })
    }
})

server.post('/users', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const profile = req.body.profile;

    try {
        const response = await sql.query(
            'INSERT INTO users (name, email, password, profile) VALUES ($1, $2, $3, $4)',
            [name, email, password, profile]
        )
        res.status(201).json({ message: 'usuario criado com sucesso', ok: true })
    } catch (error) {
        res.status(500).json({ message: error, ok: false })
    }

    return res.send('usuario cadastrado com sucesso!')
})

server.get('/issues', async (req, res) => {
    try {
        const response = await sql.query('SELECT * FROM issues')
        return res.json({ results: response.rows, ok: true })
    } catch (error) {
        res.status(500).json({ message: error, ok: false })
    }
})

server.post('/issues', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const responsible = req.body.responsible;
    const observations = req.body.observations;

    try {
        const response = await sql.query(
            'INSERT INTO issues (title, description, status, responsible, observations) VALUES ($1, $2, $3, $4, $5)',
            [title, description, status, responsible, observations ]
        )
        res.status(201).json({ message: 'sucesso', ok: true })
    } catch (error) {
        res.status(500).json({ message: error, ok: false })
    }

    return res.send('usuario cadastrado com sucesso!')
})

server.post('/login', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    try {
        const response = await sql.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        )

        if(response.rows.length === 0){
            res.status(200).json({message:'usuario nao encontrado'})
        }

        

        res.status(201).json({ message: 'Usuario logado com sucesso', ok: true })
    } catch (error) {
        res.status(500).json({ message: error, ok: false })
    }

    return res.send('usuario cadastrado com sucesso!')
})

server.listen(3000, () => {
    console.log('tá rodando: http://localhost:3000/')
})