# Login Page y Manejo de Formularios

Vamos a crear una página de Login en donde acomodaremos los componentes usando Container y Grid, crearemos campos requeridos en los text fields y crearemos un objeto de información con email y contraseña a través de un estado que se ejecute con el envío del formulario.

Primero vamos a hacer una modificación a las rutas, puesto que queremos que el componente de login no comparta el RouterLayout:

```tsx
export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path="/" element={ <RouterLayout /> }>
                <Route path="/" element={ <HomePage /> } />
            </Route>
            <Route path="/login" element={ <LoginPage /> } />
        </Routes>
    )
}
```

Para la construcción del Login usaremos el siguiente código:

```jsx
import { FC } from 'react'
import { Container, Grid, Paper, Box, Typography, TextField, Button, Stack } from '@mui/material'


export const LoginPage: FC = () => {
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
                            sx={ { mt: 1, mb: 1 } }>Iniciar sesión</Typography>

                        <Box component="form">
                            <TextField label="Correo electrónico"
                                sx={ { mt: 2, mb: 1 } }
                                margin="normal"
                                fullWidth
                                required />
                            <TextField label="Contraseña"
                                sx={ { mt: 1, mb: 2 } }
                                margin="normal"
                                fullWidth
                                required />
                            <Button type="submit"
                                variant="contained"
                                sx={ { mt: 1.5, mb: 2 } }
                                fullWidth >Iniciar sesión</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
```

Para controlar el comportamiento del formulario, debemos usar el siguiente código: Creamos un tipo para mantener nuestro código organizado y sostenible, posteriormente controlamos los eventos de cambio de los campos del formulario y el envío del mismo. Para este último caso es necesario que el componente `<Box />` sea de tipo `form` con el objetivo de recibir el evento `onSubmit`. En los componentes de `<TextField />` debemos establecer el nombre del componente, el valor al cual se asocia, y la función de cambio; dichos valores son importantes dentro de la función `handleChangeData`.

```tsx
...
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

    const handleChangeData = ( e: ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target
        setLoginData( {
            ...loginData,
            [ name ]: value
        } )
    }

    const handleSubmit = ( e: FormEvent ) => {
        e.preventDefault()
        console.table( loginData )
    }

    return (
        <Container ...>
            <Grid ...>
                <Grid item>
                    <Paper ...>
                        ...
                        <Box component="form" onSubmit={ handleSubmit }>
                            <TextField name="email" value={ loginData.email } onChange={ handleChangeData } ... />
                            <TextField name="password" value={ loginData.password } onChange={ handleChangeData } ... />
                            ...
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
```

___

| Anterior                                                                                   |                        | Siguiente                                                                          |
| ------------------------------------------------------------------------------------------ | ---------------------- | ---------------------------------------------------------------------------------- |
| [Creación de rutas y construcción de NavBar](./P3T1_Creacion_rutas_construccion_NavBar.md) | [Readme](../README.md) | [Creando notificaciones con Context](./P5T1_Creando_notificaciones_con_Context.md) |
