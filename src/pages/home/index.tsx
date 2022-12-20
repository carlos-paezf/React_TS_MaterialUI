import { Box, Button, CircularProgress, Container, Grid, Pagination } from '@mui/material'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { getAllCharacters } from '../../api'
import { CardComponent, HeaderComponent } from '../../components'
import { Character } from '../../types'


export const HomePage: FC = () => {
    const [ characters, setCharacters ] = useState<Character[] | null>( [] )
    const [ isLoading, setIsLoading ] = useState<boolean>( true )
    const [ totalPages, setTotalPages ] = useState<number>( 1 )
    const [ page, setPage ] = useState<number>( 1 )

    useEffect( () => {
        setIsLoading( true )
        getAllCharacters( { page } )
            .then( ( { results, info: { pages } } ) => {
                setCharacters( results )
                setTotalPages( pages )
            } )
            .catch( err => console.error( err ) )
            .finally( () => setTimeout( () => setIsLoading( false ), 500 ) )
    }, [ page ] )

    const handlePage = ( event: ChangeEvent<unknown>, value: number ) => {
        setPage( value )
    }

    return (
        <Container maxWidth="xl">
            <HeaderComponent title='Rick & Morty' description='Listado de personajes de la serie animada Rick & Morty' element={
                <Button variant="contained" fullWidth>Ver documentación de la API</Button>
            } />

            {
                isLoading
                    ? <Box sx={ { display: "flex", justifyContent: "center", mt: 5 } }>
                        <CircularProgress variant='indeterminate' />
                    </Box>
                    : !characters
                        ? <div>No hay resultados</div>
                        : <Grid container spacing={ 2 } direction="row" sx={ { my: 3 } }>
                            { characters.map( e => (
                                <Grid item xs={ 3 }>
                                    <CardComponent key={ e.id } { ...e } />
                                </Grid>
                            ) ) }

                            <Box sx={ { width: "100%", display: "flex", justifyContent: "center", alignItems: "center", my: 5 } }>
                                <Pagination page={ page } count={ totalPages } onChange={ handlePage } color="primary" variant='outlined' />
                            </Box>
                        </Grid>
            }
        </Container>
    )
}
