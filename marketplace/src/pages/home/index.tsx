import { Button, Container } from '@mui/material'
import { FC } from 'react'
import { HeaderComponent } from '../../components'


export const HomePage: FC = () => {
    return (
        <Container maxWidth="xl">
            <HeaderComponent title='Hola mundo' description='Hola mundo' element={
                <Button variant="contained" fullWidth>Hola Mundo</Button>
            } />
        </Container>
    )
}
