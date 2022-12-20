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
            <HeaderComponent title='Hola mundo' description='Hola mundo' element={
                <Button variant="contained" fullWidth>Hola Mundo</Button>
            } />

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
