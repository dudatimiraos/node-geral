// BANCO DE DADOS EM MEMÓRIA 

import {randomUUID} from "node:crypto"

export class DatabaseMemory{
    #videos = new Map()   // # : privado

    // Set: array no JS, não aceita valores duplicados
    //  Map: como se fosse um objeto no JS, tem uma API
    // os ids são as chaves
    
    list(search){
        return Array.from(this.#videos.entries())
        .map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

            return{
                id, 
                ...data,
            }
        })
        .filter(video => {
            if (search){
                return video.title.includes(search) 
            } 
            return true
        })
    }

    create(video){
        const videoId = randomUUID() // UUID : id único universal

        this.#videos.set(videoId, video)
    }

    updade(id,video){
        this.#videos.set(id, video)
    }

    delete(id){
        this.#videos.delete(id)
    }

}