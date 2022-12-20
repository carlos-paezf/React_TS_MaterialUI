# Renderizar componentes dentro de componentes

Vamos a crear un componente `<HeaderComponent />`, el cual debe recibir 3 parámetros, dos obligatorios y uno opcional el cual debe ser un componente.

Primero añadimos la funcionalidad de navegar a la pantalla de inicio desde el componente de `<NavBar />`, para lo cual usamos el siguiente código, aprovechamos y de paso dejamos que el `<AppBar />` sea de tipo sticky:

```tsx
import { useNavigate } from 'react-router-dom'
...
const NavBar: FC = () => {
    const navigate = useNavigate()

    return (
        <Box ...>
            <AppBar position='sticky' ...>
                <Toolbar>
                    <Container ...>
                        <Grid container ...>
                            ...
                            <Grid item>
                                <Stack ...>
                                    ...
                                    <Button ... onClick={ () => navigate( 'login' ) }>Login</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default NavBar
```

Vamos a diseñar el `<HeaderComponent />` con el código que se muestra abajo. Definimos el tipo de las props que recibirá el componente, usamos el componente `Box` para atrapar una `Grid` con un tamaño personalizado, el cual a su vez ordena una `Grid` item que ocupara un total de 6 de 12 columnas disponibles definidos mediante la propiedad `xs`. Este último item contendrá una nueva `Grid` que se ordenará en modo de columna y ordenará los items que se reciben por props:

```tsx
import { Box, Divider, Grid, Typography } from '@mui/material'
import { FC, ReactNode } from "react"


type HeaderProps = {
    title: string
    description: string
    element?: ReactNode
}

export const HeaderComponent: FC<HeaderProps> = ( { title, description, element } ) => {
    return (
        <>
            <Box sx={ { width: "100%", height: "350px" } }>
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={ { height: "100%" } }>
                    <Grid item xs={ 6 }>
                        <Grid container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={ { height: "100%" } }>
                            <Grid item>
                                <Typography variant="h1">{ title }</Typography>
                            </Grid>
                            <Grid item sx={ { mt: 2 } }>
                                <Typography>{ description }</Typography>
                            </Grid>
                            {
                                !!element && <Grid item sx={ { mt: 4, width: "100%" } }>{ element }</Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
        </>
    )
}
```

___

| Anterior                                                                        |                        | Siguiente                                                                    |
| ------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| [Notificaciones de validación con Yup](./P5T2_Notificaciones_validacion_Yup.md) | [Readme](../README.md) | [Cómo conectarnos a una API con Axios](./P7T1_Como_conectarnos_API_Axios.md) |
