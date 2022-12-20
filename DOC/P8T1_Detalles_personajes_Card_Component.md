# Detalles de personajes con Card Component

Vamos a crear un nuevo componente para la tarjeta de cada personaje, para ello hacemos uso del componente `Card` de Material UI, dentro del cual empleamos otra serie de componentes de la misma familia, que nos permitirán estructurar la tarjeta a nuestro gusto.

```tsx
import { Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from "@mui/material"
import { FC } from "react"
import { Character } from "../../types"


export const CardComponent: FC<Character> = ( { image, name, status, species } ) => {
    return (
        <Card sx={ { maxWidth: "345px" } }>
            <CardMedia component="img"
                height="195"
                image={ image }
                alt={ name } />

            <CardContent>
                <Typography variant="h5" sx={ { mb: 1.5 } }>{ name }</Typography>
                <Divider />
                <Typography sx={ { mt: 1.5 } }>Especie: { species }</Typography>
                <Typography sx={ { mt: 1.5 } }>Estado: { status }</Typography>
            </CardContent>

            <CardActions>
                <Button variant="contained" fullWidth>Ver más</Button>
            </CardActions>
        </Card>
    )
}
```

Ahora, dentro del componente `<HomePage />` vamos a crear un estado que nos permita almacenar la respuesta del endpoint, posteriormente evaluamos si hay resultados, en cuyo caso renderizamos el componente que acabamos de crear. También tendremos un estado de carga para el componente:

```tsx
import { Button, CircularProgress, Container, Grid } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { getAllCharacters } from '../../api'
import { CardComponent, HeaderComponent } from '../../components'
import { Character } from '../../types'


export const HomePage: FC = () => {
    const [ characters, setCharacters ] = useState<Character[] | null>( [] )
    const [ isLoading, setIsLoading ] = useState( true )

    useEffect( () => {
        getAllCharacters( { page: 1 } )
            .then( ( { results } ) => setCharacters( results ) )
            .catch( err => console.error( err ) )
            .finally( () => setIsLoading( false ) )
    }, [ isLoading ] )

    return (
        <Container maxWidth="xl">
            ...

            {
                isLoading
                    ? <CircularProgress variant='indeterminate' />
                    : !characters
                        ? <div>No hay resultados</div>
                        : <Grid container spacing={ 2 } direction="row">
                            { characters.map( e => (
                                <Grid item xs={ 3 }>
                                    <CardComponent key={ e.id } { ...e } />
                                </Grid>
                            ) ) }
                        </Grid>
            }
        </Container>
    )
}
```

___

| Anterior                                                                     |                        | Siguiente                                                   |
| ---------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------- |
| [Cómo conectarnos a una API con Axios](./P7T1_Como_conectarnos_API_Axios.md) | [Readme](../README.md) | [Paginación de Personajes](./P9T1_Paginacion_Personajes.md) |
