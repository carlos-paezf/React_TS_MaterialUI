# Creación de rutas y construcción de NavBar

El componente NavBar será nuestro componente común para todas las páginas. Para esta sección vamos a crear las rutas que nos permitan un layout estático en nuestra aplicación, por lo tanto seguiremos esta ruta:

- Crear un `Router.tsx` que nos permita hacer el manejo de las rutas
- Importar el manejo de las rutas en nuestro componente App.
- Crear un componente `RouteLayout.tsx` que nos permita manejar rutas junto a componentes estáticos.

Para el esqueleto de nuestro NavBar estructuramos un `Box` con un flexGrow de 1 (determinamos el factor de crecimiento del componente flexible, es decir que cantidad de espacio restante puede ocupar el componente), luego usamos un `AppBar` con una posición fija dentro de la página, añadimos un `Toolbar` que tendrá un componente `Container` que mantiene una grid. Esta `Grid` se divide en el componente Grid container que define la dirección, justificación del contenido y la alineación de los items, y dentro de dicho componente encontramos los Grid item, en donde definimos los elementos con los que vamos a interactuar. El componente `Stack` cumple un papel similar a la grid al momento de ordenarnos los componentes que estén dentro del mismo:

```tsx
import { AppBar, Box, Button, Container, Grid, Stack, Toolbar, Typography } from '@mui/material'
import { FC } from 'react'


const NavBar: FC<{}> = () => {
    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position='fixed'>
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Typography>Ferrer</Typography>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" spacing={ 2 }>
                                    <Button variant='outlined'>Register</Button>
                                    <Button variant='contained'>Login</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar
```

Procedemos a crear el archivo `Router.tsx` en donde definimos las rutas de nuestra aplicación, las cuales llaman como elementos a los componentes que llamaremos páginas.

```tsx
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home"
import { LoginPage } from "./pages/login"


export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/login" element={ <LoginPage /> } />
        </Routes>
    )
}
```

Esta configuración la llamaremos dentro del componente `<App />`:

```tsx
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './Router'


const App = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}
```

Ahora, creamos un router layout dentro de los `commons` que nos permita especificar que componentes y en donde se deben compartir:

```tsx
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'


export const RouterLayout: React.FC<{}> = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}
```

Volvemos al archivo de configuración de las rutas y hacemos uso de nuestro RouterLayout para atrapar los elementos que se mostraran en el outlet:

```tsx
import { Route, Routes } from "react-router-dom"
import { RouterLayout } from "./common/RouterLayout"
import { HomePage } from "./pages/home"
import { LoginPage } from "./pages/login"


export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={ <RouterLayout /> }>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/login" element={ <LoginPage /> } />
            </Route>
        </Routes>
    )
}
```

Cualquier ruta que este fuera del conjunto de rutas que contienen el elemento RouterLayout, no compartirán los elementos definidos dentro del mismo.

___

| Anterior                                             |                        | Siguiente                                                                     |
| ---------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------- |
| [Theme Customization](./P2T1_Theme_Customization.md) | [Readme](../README.md) | [Login Page y Manejo de Formularios](./P4T1_Login_Page_Manejo_Formularios.md) |
