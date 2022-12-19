# Notificaciones de validación con Yup - Parte 2

Antes de empezar vamos a crear una nueva notificación llamada `getSuccess`, para la cual definimos sus colores en la paleta de la aplicación:

```tsx
export enum ThemePalette {
    ...,
    SUCCESS_MAIN = "#66BB6A",
    BG_SUCCESS_MAIN = "RGBA(102, 187, 106, .5)",
}
```

Posteriormente aplicamos los colores en la personalización de los componentes:

```tsx
const theme = createTheme( {
    ...,
    components: {
        ...,
        MuiAlert: {
            ...,
            styleOverrides: {
                ...,
                standardSuccess: {
                    border: `1px solid ${ ThemePalette.SUCCESS_MAIN }`,
                    background: ThemePalette.BG_SUCCESS_MAIN
                }
            }
        }
    }
} )
```

Dentro del tipo del las props del contexto añadimos una propiedad para obtener el mensaje de success:

```tsx
type ContextProps = {
    ...
    getSuccess: ( msg: string ) => void
}
```

Y en el componente proveedor del contexto añadimos la función que se pasará por el context api:

```tsx
export const NotificationProvider: FC<{ children: JSX.Element }> = ( { children } ) => {
    ...
    const getSuccess = ( msg: string ): void => {
        setSeverity( "success" )
        setOpen( true )
        setMessage( msg )
    }
    ...
    const value = { ..., getSuccess }

    return (...)
}
```

De nuevo, podemos hacer la prueba dentro del componente `<HomePage />`:

```ts
export const HomePage: FC = () => {
    const { getError, getSuccess } = useNotification()

    const handleClick = () => {
        getSuccess( 'Prueba de notificación' )
    }

    return (
        <Container sx={ { mt: 3 } } maxWidth="xl">
            <Button variant="contained" onClick={ handleClick }>Hola Mundo</Button>
        </Container>
    )
}
```

Ahora si vamos a instalar el paquete de Yup con el comando a continuación, el cual nos va a ayudar a hacer validaciones de los argumentos que le entreguemos:

```txt
pnpm i yup
```

Vamos a ver el ejemplo con los campos del login. Primero creamos una constante con la validación de los campos:

```tsx
import * as yup from 'yup'

export const LoginValidate = yup
    .object()
    .shape( {
        email: yup
            .string()
            .trim()
            .required( "El correo es requerido" ),
        password: yup
            .string()
            .trim()
            .required( "La contraseña es requerida" ),
    } )
```

Dentro del componente `<LoginPage />` vamos a hacer uso de la constante anterior para validar nuestros campos, además que usaremos las notificaciones para notificar los errores personalizados en caso de ocurran, o que nos muestre, por el momento, los datos ingresados en el formulario. Para mostrar nuestro errores y no los por defecto de html necesitamos eliminar la propiedad de required de los campos de texto:

```tsx
...
import { LoginValidate } from '../../helpers'
...
export const LoginPage: FC = () => {
    const { getError, getSuccess } = useNotification()
    ...
    const handleSubmit = ( e: FormEvent ): void => {
        e.preventDefault()
        LoginValidate.validate( loginData )
            .then( () => {
                getSuccess( JSON.stringify( { ...loginData } ) )
            } )
            .catch( error => {
                getError( error.message )
            } )
    }

    return (...)
}
```

___

| Anterior                                                                           |                        | Siguiente                                                                                           |
| ---------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------- |
| [Creando notificaciones con Context](./P5T1_Creando_notificaciones_con_Context.md) | [Readme](../README.md) | [Renderizar componentes dentro de componentes](./P6T1_Renderizar_componentes_dentro_componentes.md) |
