# Navegación (useNavigate)

Dentro del componente `<Card />` tenemos un botón que se debe encargar de mostrar la vista del detalle de un personaje. Para poder generar esta interacción debemos usar el hook de `useNavigate` de react-router-dom, y luego debemos navegar al id cuando se pulsa el botón de ver más.

```tsx
...
import { useNavigate } from "react-router-dom"

export const CardComponent: FC<Character> = ( { id, ... } ) => {
    const navigate = useNavigate()

    return (
        <Card sx={ { maxWidth: "345px" } }>
            ...
            <CardActions>
                <Button onClick={ () => navigate( `/${ id }` ) } ...>Ver más</Button>
            </CardActions>
        </Card>
    )
}
```

___

| Anterior                                                                  |                        | Siguiente                                                                           |
| ------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| [Página por personaje (useParams)](./P10T1_Pagina_Personaje_useParams.md) | [Readme](../README.md) | [Redux - Introducción a redux-toolkit](./P12T1_Redux_Introduccion_redux-toolkit.md) |
