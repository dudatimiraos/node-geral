// BANCO DE DADOS EM MEMÓRIA 

import {randomUUID} from "node:crypto"
import sql from './db.js'

export class DatabasePostgres{
    async list(search){   // só usa await em funções que tem async
       let videos  

       if(search){
        videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`  //ilike: ve se o titulo contem uma string
       }else{
        videos = await sql`select * from videos`
       }
        return videos
    }

    async create(video){
       const videoId = randomUUID()
       const {title, description, duration} = video

       await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    async updade(id,video){
        const {title, description, duration} = video

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id){
        await sql`delete from videos where id = ${id}`
    }

}