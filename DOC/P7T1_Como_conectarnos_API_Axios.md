# Cómo conectarnos a una API con Axios

En esta lección vamos a crear una instancia de Axios, obtendremos los datos en consola y diagramaremos los datos.

Primero creamos un directorio llamado `/api` en donde vamos a configurar las peticiones a todos los endpoint, inicialmente configuramos la url base e instalamos axios con el siguiente comando:

```txt
pnpm i axios
```

Creamos una instancia de axios a donde apuntaremos las peticiones:

```ts
import axios from "axios"

const baseURL = 'https://rickandmortyapi.com/api'

export const instance = axios.create( {
    baseURL
} )
```

Luego creamos un archivo para las peticiones al endpoint de personajes que ofrece la api. Para facilitarnos la tarea de saber las propiedades que puede tener la data, se decide hacer un tipado de la respuesta y con ello simplificar el proceso:

```ts
import { CharactersResponse } from "../types"
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
```

Dentro del componente `<HomePage />` haremos la prueba de que la data está llegando, y para ello hacemos lo siguiente:

```tsx
...
import { ..., useEffect } from 'react'
import { characters } from '../../api'

export const HomePage: FC = () => {
    useEffect( () => {
        characters.getAll( { page: 1 } )
            .then( ( { info, results } ) => console.log( { info, results } ) )
            .catch( err => console.error( err ) )
    } )

    return (...)
}
```

Si todo va bien, en consola podremos observar el resultado de la petición, de lo contrario observaremos el error generado.

___

| Anterior                                                                                            |                        | Siguiente                                                                                 |
| --------------------------------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| [Renderizar componentes dentro de componentes](./P6T1_Renderizar_componentes_dentro_componentes.md) | [Readme](../README.md) | [Detalles de personajes con Card Component](./P8T1_Detalles_personajes_Card_Component.md) |
