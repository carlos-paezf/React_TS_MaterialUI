# Creando notificaciones con Context - Parte 1

Para esta sección vamos a customizar el componente Alert de Material UI, crear un componente llamado `CustomSnackBar` el cual implementaremos nuestras notificaciones personalizadas, crear un provider y probarlo.

Primero vamos a personalizar el Alert de errores, para lo cual hacemos la siguiente modificación en la paleta de nuestra aplicación:

```tsx
export enum ThemePalette {
    ...,
    ERROR_MAIN = "#F44336",
    BG_ERROR_MAIN = "RGBA(224, 67, 54, 0.1)"
}
```

Procedemos a configurar el estilo de la alerta, y definimos los estilos que se comparten para todas las variantes dentro de la propiedad `defaultProps`, y sobrescribimos el estilo para la variante del error dentro de `styleOverrides`

```tsx
const theme = createTheme( {
    ...,
    components: {
        ...,
        MuiAlert: {
            defaultProps: {
                style: {
                    borderRadius: ".8em",
                    fontSize: "1em",
                }
            },
            styleOverrides: {
                standardError: {
                    border: `1px solid ${ ThemePalette.ERROR_MAIN }`,
                    background: ThemePalette.BG_ERROR_MAIN
                }
            }
        }
    }
} )
```

Creamos un componente para las notificaciones, el cual recibirá como propiedad si está abierto o cerrado, el mensaje que se mostrará, la severidad del mensaje, y una función para cerrar los elementos. El componente se mostrara en la parte superior centro, con una duración de 4 segundos:

```tsx
import { Alert, AlertColor, Snackbar, Typography } from '@mui/material'
import { FC } from 'react'


type NotificationProps = {
    open: boolean,
    message: string,
    severity?: AlertColor,
    handleClose: () => void
}


export const Notification: FC<NotificationProps> = ( { open, message, severity, handleClose } ) => {
    return (
        <Snackbar anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
            autoHideDuration={ 4000 }
            open={ open }
            onClose={ handleClose }>
            <Alert onClose={ handleClose } severity={ severity }>
                <Typography>
                    { message }
                </Typography>
            </Alert>
        </Snackbar>
    )
}
```

Vamos a crear un contexto que se proveerá dentro de la aplicación, y dicho contexto puede tener o uno una función para obtener el error de la notificación.

```tsx
import { createContext } from "react"

type ContextProps = {
    getError: ( msg: string ) => void
}

const NotificationContext = createContext<ContextProps | null>( null )
```

Posteriormente, creamos un componente que hará las veces de proveedor, y funcionará bajo el concepto de HoC (Higher-order component). Definimos las propiedades y funciones que se emplearán en la notificación y el valor que se proveerá mediante el contexto. Las alertas estarán al mismo nivel del componente hijo.

```tsx
import { AlertColor } from "@mui/material"
import { ..., FC, useState } from "react"
import { Notification } from '../components'

...

export const NotificationProvider: FC<{ children: JSX.Element }> = ( { children } ) => {
    const [ message, setMessage ] = useState<string>( '' )
    const [ open, setOpen ] = useState<boolean>( false )
    const [ severity, setSeverity ] = useState<AlertColor | undefined>()

    const getError = ( msg: string ) => {
        setSeverity( "error" )
        setOpen( true )
        setMessage( msg )
    }

    const handleClose = () => {
        setOpen( false )
    }

    const value = { getError }

    return (
        <NotificationContext.Provider value={ value }>
            <Notification message={ message }
                severity={ severity }
                open={ open }
                handleClose={ handleClose } />
            { children }
        </NotificationContext.Provider>
    )
}
```

Dentro del componente `<App />` proveemos el contexto:

```tsx
const App: FC = () => {
    return (
        <NotificationProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </NotificationProvider>
    )
}
```

También necesitamos crear una función que nos permita acceder al contenido del contexto, el cual si no existe arrojará un error:

```tsx
import { ..., useContext } from "react"

export const useNotification = () => {
    const context = useContext( NotificationContext )

    if ( !context ) throw new Error( `No existe contexto` )

    return context
}
```

Ahora, por ejemplo, podemos hacer la prueba de funciona nuestras notificaciones desde cualquier componente, en este caso haremos la prueba desde un botón en el `<Home />`:

```tsx
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
            <Button variant="contained" onClick={ handleClick }>Lanzar notificación</Button>
        </Container>
    )
}
```

___

| Anterior                                                                      |                        | Siguiente                                                                       |
| ----------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| [Login Page y Manejo de Formularios](./P4T1_Login_Page_Manejo_Formularios.md) | [Readme](../README.md) | [Notificaciones de validación con Yup](./P5T2_Notificaciones_validacion_Yup.md) |
