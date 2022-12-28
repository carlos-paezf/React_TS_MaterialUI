# Redux - Trabajando con el carrito

Primero vamos a hacer que el método para eliminar el item del carrito tenga un poco más de seguridad al evaluar si primero está dicho item en el carrito:

```tsx
export const cartSlice = createSlice( {
    ...,
    reducers: {
        ...,
        removeToCart: ( state, action: PayloadAction<CartRemoveState> ) => {
            if ( state.some( ( item => item.id === action.payload.id ) ) )
                return state.filter( item => item.id !== action.payload.id )
        }
    }
} )
```

Ahora, dentro del componente `<CartComponent />` vamos a obtener los items que están dentro del reducer, para poder recorrerlos y listar es sus respectivas tarjetas:

```tsx
export const CartComponent: FC<CartComponentProps> = ( { open, handleStateViewDrawer } ) => {
    const items = useAppSelector( ( state ) => state.cartReducer )

    return (
        <Drawer ...>
            <Box ...>
                ...
                {
                    ( !items || !items.length )
                        ? <Typography sx={ { m: 2 } }>No hay elementos en el carrito =(</Typography>
                        : items.map( character => <HorizontalCardComponent key={ character.id } { ...character } /> )
                }
            </Box>
        </Drawer>
    )
}
```

Lo siguiente será obtener la cantidad de elementos que están en el carrito para saber que poner en el badge del icono del carrito, para ello, dentro del componente `<NavBarComponent />` hacemos uso del selector de nuestro estado global y usamos el tamaño del mismo:

```tsx
const NavBar: FC = () => {
    ...
    const itemsCount = useAppSelector( state => state.cartReducer ).length
    ...
    return (...)
}
```

También he sacado el componente del botón del carrito como un componente aparte, para que pueda ser usado más fácil desde otros lados de la aplicación:

```tsx
import { ShoppingCartOutlined as ShoppingCartOutlinedIcon } from '@mui/icons-material'
import { Badge, IconButton, Stack, Typography } from '@mui/material'
import { FC } from "react"


type Props = {
    handleStateViewDrawer: () => void
    itemsCount: number
}


export const ShoppingCartComponent: FC<Props> = ( { handleStateViewDrawer, itemsCount } ) => {
    return (
        <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography sx={ { display: { sm: 'none' } } }>Cart items:</Typography>
            <IconButton color="primary" onClick={ handleStateViewDrawer }>
                <Badge color="error" badgeContent={ itemsCount }>
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </IconButton>
        </Stack>
    )
}
```

Un último paso es integrar la funcionalidad de la eliminación, para lo cual dentro del componente `<HorizontalCardComponent />` hacemos uso de nuestro custom hook para el dispatch, junto a una función personalizada para eliminar el item una vez se presione el botón encargado:

```tsx
export const HorizontalCardComponent: FC<Props> = ( { id, name, image, info } ) => {
    const dispatch = useAppDispatch()

    const handleRemoveToCart = () => {
        dispatch( removeToCart( { id } ) )
    }

    return (
        <Card ...>
            ...
                <Grid item ...>
                    <CardActions>
                        <IconButton onClick={ handleRemoveToCart }>
                            <CloseRoundedIcon />
                        </IconButton>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    )
}
```

___

| Anterior                                                                                               |                        | Siguiente                                                                 |
| ------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------- |
| [Redux - Lógica de agregar y remover del carrito](./P13T1_Redux_Logica_agregar_remover_del_carrito.md) | [Readme](../README.md) | [Redux - Store en el Local Storage](./P15T1_Redux_Store_Local_Storage.md) |
