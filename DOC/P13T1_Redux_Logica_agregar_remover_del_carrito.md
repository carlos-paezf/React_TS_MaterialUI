# Redux - Lógica de agregar y remover del carrito

Vamos a hacer unos cambios con respecto a la lección anterior. Vamos a cambiarle el nombre a la interfaz que teníamos definida en el slice, y añadiremos una nueva para los cuanto removemos elementos del carrito:

```tsx
interface CartAddState {
    id: string | number
    name: string
    image: string
    origen: string
}

interface CartRemoveState {
    id: string | number
}

const initialState: CartAddState[] = []

export const cartSlice = createSlice( {
    name: 'cart',
    initialState,
    reducers: {
        addToCart: ( state, action: PayloadAction<CartAddState> ) => { },
        removeToCart: ( state, action: PayloadAction<CartRemoveState> ) => { }
    }
} )
```

Lo siguiente será darle funcionalidad al reducer de agregar al carrito, para lo cual añadimos la siguiente lógica dentro de los reducers del slice: Si el state está vació, o si todos los items son diferentes al que se piensa agregar, entonces, se debe añadir el payload de la petición dentro del state.

```ts
export const cartSlice = createSlice( {
    ...,
    reducers: {
        addToCart: ( state, action: PayloadAction<CartAddState> ) => {
            if ( !state.length || state.every( item => item.id !== action.payload.id ) ) {
                state.push( action.payload )
            }
        },
        ...
    }
} )
```

Dentro del componente `<CardComponent />` llamamos nuestro custom hook para disparar las acciones, definimos un estado para saber si se debe deshabilitar un botón o no, y una variable que almacena el valor del estado que se extrae mediante el custom hook de `useAppSelector`. Mediante un `useEffect` evaluamos la condición para desactivar el botón de añadir, cuya acción se debe definir mediante la comparación de sia hay o no elementos dentro del estado con los items. Mediante una función que llamamos al momento de presionar el botón de añadir, disparamos la función para añadir los elementos al carrito.

```ts
...
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addToCart } from "../../redux/slices/cart.slice"

export const CardComponent: FC<Character> = ( { id, image, name, status, species, origin } ) => {
    ...
    const dispatch = useAppDispatch()

    const [ disableBtn, setDisableBtn ] = useState<boolean>( false )
    const itemExist = useAppSelector( ( state ) => state.cartReducer )

    useEffect( () => {
        setDisableBtn( itemExist.some( item => item.id === id ) )
    }, [ itemExist, id ] )

    const handleAddToCart = () => {
        dispatch( addToCart( {
            id,
            name,
            image,
            info: origin.name
        } ) )
    }

    return (
        <Card sx={ { maxWidth: "345px" } }>
            ...
            <CardActions>
                ...
                <Button onClick={ handleAddToCart } disabled={ disableBtn } ...>Add to cart</Button>
            </CardActions>
        </Card>
    )
}
```

Para el caso de remover, temporalmente dejaremos la siguiente lógica dentro del slice.

```tsx
export const cartSlice = createSlice( {
    ...,
    reducers: {
        ...,
        removeToCart: ( state, action: PayloadAction<CartRemoveState> ) => {
            state.filter( item => item.id !== action.payload.id )
        }
    }
} )
```

___

| Anterior                                                                            |                        | Siguiente                                                                       |
| ----------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| [Redux - Introducción a redux-toolkit](./P12T1_Redux_Introduccion_redux-toolkit.md) | [Readme](../README.md) | [Redux - Trabajando con el carrito](./P14T1_Redux_Trabajando_con_el_carrito.md) |
