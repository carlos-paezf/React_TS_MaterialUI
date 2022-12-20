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