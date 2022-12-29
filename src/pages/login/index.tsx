import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useNotification } from '../../context/notification.context'
import { LoginValidate } from '../../helpers'


type LoginType = {
    email: string
    password: string
}


export const LoginPage: FC = () => {
    const { getSuccess } = useNotification()

    const { handleSubmit, handleChange, values, touched, errors } = useFormik<LoginType>( {
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginValidate,
        onSubmit: ( values ) => {
            getSuccess( JSON.stringify( { ...values }, null, 4 ) )
        }
    } )

    const { email, password } = values

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
                            <TextField name="email"
                                value={ email } onChange={ handleChange }
                                error={ touched.email && Boolean( errors.email ) }
                                helperText={ touched.email && errors.email }
                                type="email"
                                label="Correo electrónico"
                                sx={ { mt: 2, mb: 1 } }
                                margin="normal"
                                fullWidth />
                            <TextField name="password"
                                value={ password } onChange={ handleChange }
                                error={ touched.password && Boolean( errors.password ) }
                                helperText={ touched.password && errors.password }
                                type="password"
                                label="Contraseña"
                                sx={ { mt: 1, mb: 2 } }
                                margin="normal"
                                fullWidth />

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