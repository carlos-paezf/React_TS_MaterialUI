# Paginación de Personajes

Para hacer la paginación usaremos el componente `<Pagination />` de Material UI, para ello necesitamos algunas modificaciones dentro del componente de `<HomePage />`:

Primero definimos un estado para la página a buscar, ya que la api nos le podemos hacer la petición por parámetro de cual página mostrar. Luego creamos un estado para recibir la cantidad total de páginas que se pueden mostrar según la misma respuesta de la API. Con estos estados pasamos a modificar el hook `useEffect` para asignarles sus valores respectivos.

También debemos crear un método para reconocer el cambio de página y por lo tanto modificar el valor del estado que se envía a la petición.

```tsx
...
import { ..., Pagination } from '@mui/material'

export const HomePage: FC = () => {
    ...
    const [ totalPages, setTotalPages ] = useState<number>( 1 )
    const [ page, setPage ] = useState<number>( 1 )

    useEffect( () => {
        setIsLoading( true )
        getAllCharacters( { page } )
            .then( ( { results, info: { pages } } ) => {
                setCharacters( results )
                setTotalPages( pages )
            } )
            .catch( err => console.error( err ) )
            .finally( () => setTimeout( () => setIsLoading( false ), 500 ) )
    }, [ page ] )

    const handlePage = ( event: ChangeEvent<unknown>, value: number ) => {
        setPage( value )
    }

    return (
        <Container maxWidth="xl">
            ...

            {
                isLoading
                    ? ...
                    : !characters
                        ? ...
                        : <Grid container spacing={ 2 } direction="row" sx={ { my: 3 } }>
                            ...

                            <Box sx={ { width: "100%", display: "flex", justifyContent: "center", alignItems: "center", my: 5 } }>
                                <Pagination page={ page } count={ totalPages } onChange={ handlePage } />
                            </Box>
                        </Grid>
            }
        </Container>
    )
}
```

El componente `<Pagination />` tiene varias propiedades que nos permiten personalizarlos desde el componente inline, o podemos hacer su personalización desde nuestro archivo de personalización de tema.

___

| Anterior                                                                                  |                        | Siguiente                                                                 |
| ----------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------- |
| [Detalles de personajes con Card Component](./P8T1_Detalles_personajes_Card_Component.md) | [Readme](../README.md) | [Página por personaje (useParams)](./P10T1_Pagina_Personaje_useParams.md) |
