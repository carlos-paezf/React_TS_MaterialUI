import { Button, Container } from '@mui/material'
import { FC, useEffect } from 'react'
import { characters } from '../../api'
import { HeaderComponent } from '../../components'


export const HomePage: FC = () => {
    useEffect( () => {
        characters.getAll( { page: 1 } )
            .then( console.log )
            .catch( err => console.error( err ) )
    } )

    return (
        <Container maxWidth="xl">
            <HeaderComponent title='Hola mundo' description='Hola mundo' element={
                <Button variant="contained" fullWidth>Hola Mundo</Button>
            } />
        </Container>
    )
}
