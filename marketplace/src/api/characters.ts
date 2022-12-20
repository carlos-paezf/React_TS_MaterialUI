import { Character, CharactersResponse } from "../types"
import { instance } from "./base.api"


const endpoint = "character"


type getParams = {
    page: number
}


export const characters = {
    getAll: async ( { page = 1 }: getParams ): Promise<CharactersResponse> => {
        const { data } = await instance.get<CharactersResponse>( endpoint, { params: { page } } )
        return data
    },
    getByID: async ( id: number ): Promise<Character> => {
        const { data } = await instance.get<Character>( `${ endpoint }/${ id }` )
        return data
    }
}