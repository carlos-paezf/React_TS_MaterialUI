import { Button, Container } from '@mui/material'
import { FC } from 'react'


export const HomePage: FC = () => {
    return (
        <Container sx={ { mt: 3 } } maxWidth="xl">
            <Button variant="contained">Hola Mundo</Button>
        </Container>
    )
}
