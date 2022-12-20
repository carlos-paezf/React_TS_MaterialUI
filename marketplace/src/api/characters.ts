import { Character, CharactersResponse } from "../types"
import { instance } from "./base.api"


const endpoint = "character"


type getParams = {
    page: number
}


const characters = {
    getAllCharacters: async ( { page = 1 }: getParams ): Promise<CharactersResponse> => {
        const { data } = await instance.get<CharactersResponse>( endpoint, { params: { page } } )
        return data
    },
    getCharacterByID: async ( id: number ): Promise<Character> => {
        const { data } = await instance.get<Character>( `${ endpoint }/${ id }` )
        return data
    }
}


export const { getAllCharacters, getCharacterByID } = characters