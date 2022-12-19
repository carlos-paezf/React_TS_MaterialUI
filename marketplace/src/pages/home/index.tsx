import { Button, Container } from '@mui/material'
import { FC } from 'react'
import { useNotification } from '../../context/notification.context'


export const HomePage: FC = () => {
    const { getError } = useNotification()

    const handleClick = () => {
        getError( 'Prueba de notificación' )
    }

    return (
        <Container sx={ { mt: 3 } } maxWidth="xl">
            <Button variant="contained" onClick={ handleClick }>Hola Mundo</Button>
        </Container>
    )
}
