# Página por personaje (useParams)

Para la página dedicada a un solo personaje necesitamos crear una nueva ruta que llame al componente especifico, en este caso necesitamos que este atrapado por el `<RouterLayout />` y que además pueda recibir un parámetro:

```tsx
export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path="/" element={ <RouterLayout /> }>
                ...
                <Route path="/:characterId" element={ <CharacterPage /> } />
            </Route>
            ...
        </Routes>
    )
}
```

También necesitamos definir que el parámetro que reciba la función fetcher puede llegar a ser null, por lo tanto debemos hacer la siguiente modificación:

```tsx
const characters = {
    ...,
    getCharacterByID: async ( id: number | undefined ): Promise<Character> => {
        if ( !id ) throw new Error( 'El id es requerido' )
        const { data } = await instance.get<Character>( `${ endpoint }/${ id }` )
        return data
    }
}
```

Dentro del componente hacemos uso del hook `useParams` de react-router-dom para poder tomar el id del personaje a detallar. Posteriormente creamos algunos estados para almacenar la información del personaje y un estado de carga. Si está cargando la petición o no hay información del personaje se muestran componentes con la estrategia del renderizado condicional. En caso contrario se muestra un esquema con la información.

```tsx
import { Box, Chip, CircularProgress, Container, Divider, Grid, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { getCharacterByID } from "../../api"
import { Character } from '../../types'
import { Status } from '../../types/characters'


export const CharacterPage: FC = () => {
    const { characterId } = useParams()

    const [ character, setCharacter ] = useState<Character | null>( null )
    const [ isLoading, setIsLoading ] = useState<boolean>( true )

    useEffect( () => {
        setIsLoading( true )
        getCharacterByID( Number( characterId ) )
            .then( res => setCharacter( res ) )
            .catch( console.error )
            .finally( () => setTimeout( () => setIsLoading( false ), 500 ) )
    }, [ characterId ] )

    if ( isLoading ) return (
        <Box sx={ { display: "flex", justifyContent: "center", width: "100%", pt: 10 } }>
            <CircularProgress variant='indeterminate' />
        </Box>
    )

    if ( !character ) return (
        <Box sx={ { display: "flex", justifyContent: "center", width: "100%", pt: 10 } }>
            <div>Error</div>
        </Box>
    )

    const { name, species, image, origin, status, episode } = character

    return (
        <Box sx={ { width: "100%", pt: 10 } }>
            <Container maxWidth="xl">
                <Grid container columnSpacing={ 2 }>
                    <Grid item xs={ 6 }>
                        <Typography variant='h2' sx={ { my: 2 } }>{ name }</Typography>
                        <Divider />
                        <Typography variant='h6' sx={ { my: 2 } }>Especie: { species }</Typography>
                        <Typography variant='h6' sx={ { my: 2 } }>Origen: { origin.name }</Typography>
                        <Box sx={ { my: 2 } }>
                            <Typography variant='h6'>Estado:&nbsp;
                                <Chip label={ status } variant="outlined" color={
                                    status === Status.Alive
                                        ? "primary"
                                        : status === Status.Dead
                                            ? "error"
                                            : "info"
                                } />
                            </Typography>
                        </Box>
                        <Typography variant='h6' sx={ { my: 2 } }>Cantidad de episodios en los que aparece: { episode.length }</Typography>
                    </Grid>
                    <Grid item xs={ 6 }>
                        <img src={ image } alt={ name } style={ { width: "100%", borderRadius: '.5em' } } />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
```

___

| Anterior                                                    |                        | Siguiente                                                     |
| ----------------------------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| [Paginación de Personajes](./P9T1_Paginacion_Personajes.md) | [Readme](../README.md) | [Navegación (useNavigate)](./P11T1_Navegacion_useNavigate.md) |
