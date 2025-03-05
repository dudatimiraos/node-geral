// import {createServer} from 'node:http'

// //request: informações da requisição que está sendo feita pra dentro da minha API
// //response: é o objeto que vou utilizar pra devolver uma resposta pra qm ta chamando a API
// const server = createServer((request, response) => {
//     response.write('Hello World')
//     return response.end()
// })

// server.listen(3333)

/////////////////////////////////////////////////////////////////


// import {fastify} from 'fastify'

// const server = fastify()

// // ('/') : rotas
// server.get('/', () => {
//     return 'Hello World'
// })

// server.get('/hello', () => {
//     return 'Hello Duda'
// })

// server.get('/node', () => {
//     return 'Hello Node.js'
// })

// server.listen({
//     port: 3333,
// })


//////////////////////////////////////////////////

// POST localhost: 3333/videos
// PUT localhost: 3333/videos  + id ( devido ao route parameter)
// DELETE localhost: 3333/videos


// GET: busca alguma informação; POST: criação de algum registro
// PUT: alteração/atualizar ; DELETE: deletar; PATCH: alterar alguma info especifica de algum recurso
// Route Paramater : parametro que é enviado na rota









import {fastify} from 'fastify'
//import {DatabaseMemory} from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//criação do banco de dados
//const database = new DatabaseMemory()
const database = new DatabasePostgres()


//Request Body: no post e no put eu posso enviar um corpo para a requisição
// POST: http://localhost:3333/videos
server.post('/videos', async(request, reply) => {
    const {title, description, duration} = request.body

     await database.create({
        title: title,
        description: description,
        duration: duration,
     })

     return reply.status(201).send()
})


server.get('/videos', async(request) => {
    const search = request.query.search

    const videos = await database.list(search)

    //console.log(videos)

    return videos
})

//atualiza um único vídeo específico (update)
server.put('/videos/:id', async (request, reply) => {       // Route Paramater
    const videoId = request.params.id
    const {title, description, duration} = request.body
    
    await database.updade(videoId, {
        title,
        description,
        duration
    })
    return reply.status(204).send()
})


server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})