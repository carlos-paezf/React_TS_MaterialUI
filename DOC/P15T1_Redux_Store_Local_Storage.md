# Redux - Store en el Local Storage

Para almacenar o actualizar la data dentro del Local Storage al momento de ejecutar algún reducer, vamos a separar responsabilidades, creando un nuevo archivo que se encargue de la gestión de métodos dentro del localStorage de la siguiente manera:

```ts
export const getItem = ( key: string ) => {
    return JSON.parse( localStorage.getItem( key )! ) ?? {}
}


export const setItem = ( key: string, value: unknown ) => {
    return localStorage.setItem( key, JSON.stringify( value ) )
}
```

Ahora, al momento de recargar o entrar a nuestra página, vamos a asignar al valor inicial del state, el elemento que se encuentra dentro del localStorage, para lo cual en el slice escribimos el siguiente código:

```ts
...
const initialState: CartAddState[] = getItem( "cart" ) || []
...
```

Cada que agregamos un item al carrito, vamos a invocar el método que se encarga de guardar la información en el localStorage, por lo tanto dentro del componente `<CardComponente />` hacemos uso del método dentro del `useEffect` con el fin de mantener actualizada la información:

```tsx
export const CardComponent: FC<Character> = ( { id, image, name, status, species, origin } ) => {
    ...
    const itemExist = useAppSelector( ( state ) => state.cartReducer )
    ...
    useEffect( () => {
        ...
        setItem( 'cart', itemExist )
    }, [ itemExist, id ] )
    ...
    return (...)
}
```

Ahora, cada que añadimos o removemos un item del carrito, al invocar la función como lo hicimos anteriormente, vamos a asegurarnos que la información siempre se mantendrá actualizada y con solo un llamado dentro de nuestro código.

___

| Anterior                                                                        |                        | Siguiente                                                              |
| ------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------- |
| [Redux - Trabajando con el carrito](./P14T1_Redux_Trabajando_con_el_carrito.md) | [Readme](../README.md) | [Formik: Validación eficiente](./P16T1_Formik_Validacion_eficiente.md) |
