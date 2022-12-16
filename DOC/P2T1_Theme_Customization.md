# Theme Customization

Vamos a personalizar nuestros componentes y estilos del proyecto mediante [Material UI](https://mui.com/material-ui/customization/theming/). Se debe crear un objeto que se proveerá a toda la aplicación. Primero vamos a definir las fuentes de la letra, para ello ingresamos a [Google Fonts](https://fonts.google.com/) y seleccionamos las tipologías *Libre Baskerville* (títulos) + *Libre Franklin* (texto normal), copiamos la url que nos genera y la importamos dentro de nuestro archivo `index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Libre+Franklin&display=swap');
```

Para visualizar los cambios que vamos haciendo crearemos una pequeña interfaz en el componente `<App />`, aprovecharemos los componentes de Material UI puesto que los iremos personalizando en caso de ser necesario:

```tsx
import { Button, Container } from '@mui/material'
import './App.css'

const App = () => {
    return (
        <Container maxWidth="xl">
            <Button variant="contained">Hola Mundo</Button>
        </Container>
    )
}

export default App
```

Construiremos el archivo de configuración llamado `src/config/theme.config.tsx`, en el cual creamos un functional component que proveerá de manera global el tema que personalicemos aplicando el patrón de HoC (Higher-order-Component):

```tsx
import { FC } from "react"
import { ..., CssBaseline, ThemeProvider } from '@mui/material'

type ThemeProps = {
    children: JSX.Element
}

export const ThemeConfig: FC<ThemeProps> = ( { children } ) => {
    return (
        <ThemeProvider theme={ theme }>
            <CssBaseline />
            { children }
        </ThemeProvider>
    )
}
```

Algo que observamos del componente es que se está usando un provider con un tema, el cual veremos a continuación, acompañado de `<CssBaseline />` el cual ayuda a iniciar una línea base elegante, consistente y simple sobre la cual construir. Ahora sí, miremos la configuración del tema: Creamos un enum que nos ayude a definir variables como los colores, las fuentes y otros elementos visuales. Posteriormente, hacemos uso de la función `createTheme()` de Material UI para definir la paleta, tipografía, y componentes. En la primera propiedad definimos que el modo sea `dark`, con un color de fondo y primario especiales. En la tercera propiedad personalizamos el componente botón.

```tsx
import { createTheme, ... } from '@mui/material'

export enum ThemePalette {
    BG = "#12181b",
    LIME = "#C8FA5F",
    FONT_GLOBAL = "'Libre Franklin', monospace"
}

const theme = createTheme( {
    palette: {
        mode: 'dark',
        background: {
            default: ThemePalette.BG
        },
        primary: {
            main: ThemePalette.LIME
        }
    },
    typography: {
        fontFamily: ThemePalette.FONT_GLOBAL
    },
    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    textTransform: "none",
                    boxShadow: "none",
                    borderRadius: ".5em",
                    wordSpacing: "5px",
                    letterSpacing: ".75px"
                }
            }
        }
    }
} )
```

Lo que resta es proveer el tema a toda la aplicación dentro del archivo `main.tsx`, atrapando como hijo el componente `<App />`.

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeConfig } from './config/theme.config'


ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
    <React.StrictMode>
        <ThemeConfig>
            <App />
        </ThemeConfig>
    </React.StrictMode>,
)
```

___

| Anterior                                                           |                        | Siguiente                                                                                  |
| ------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------ |
| [Iniciando nuestro proyecto](./P1T1_Iniciando_nuestro_proyecto.md) | [Readme](../README.md) | [Creación de rutas y construcción de NavBar](./P3T1_Creacion_rutas_construccion_NavBar.md) |
