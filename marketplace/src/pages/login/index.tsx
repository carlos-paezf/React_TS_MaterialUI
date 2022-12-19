import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { ChangeEvent, FC, FormEvent, useState } from 'react'


type LoginType = {
    email: string
    password: string
}


export const LoginPage: FC = () => {
    const [ loginData, setLoginData ] = useState<LoginType>( {
        email: '',
        password: ''
    } )

    const { email, password } = loginData

    /**
     * The function takes an event as an argument, and then uses the event's target to set the state of
     * the loginData object.
     * @param e - ChangeEvent<HTMLInputElement>
     */
    const handleChangeData = ( e: ChangeEvent<HTMLInputElement> ): void => {
        const { name, value } = e.target
        setLoginData( {
            ...loginData,
            [ name ]: value
        } )
    }

    /**
     * "The function handleSubmit takes an event of type FormEvent and returns nothing."
     * 
     * The function handleSubmit takes an event of type FormEvent and returns nothing.
     * @param {FormEvent} e - FormEvent - This is the event that is triggered when the form is
     * submitted.
     */
    const handleSubmit = ( e: FormEvent ): void => {
        e.preventDefault()
        console.table( { ...loginData } )
    }

    return (
        <Container maxWidth="sm">
            <Grid container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={ { minHeight: '100vh' } }>
                <Grid item>
                    <Paper sx={ { padding: '2em', borderRadius: '.5em' } }>
                        <Typography variant="h4"
                            textAlign="left"
                            sx={ { mt: 1, mb: 1 } }>
                            Iniciar sesión
                        </Typography>

                        <Box component="form" onSubmit={ handleSubmit }>
                            <TextField name="email" value={ email } onChange={ handleChangeData }
                                type="email"
                                label="Correo electrónico"
                                sx={ { mt: 2, mb: 1 } }
                                margin="normal"
                                fullWidth
                                required />
                            <TextField name="password" value={ password } onChange={ handleChangeData }
                                type="password"
                                label="Contraseña"
                                sx={ { mt: 1, mb: 2 } }
                                margin="normal"
                                fullWidth
                                required />

                            <Button type="submit"
                                variant="contained"
                                sx={ { mt: 1.5, mb: 2 } }
                                fullWidth >
                                Iniciar sesión
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}