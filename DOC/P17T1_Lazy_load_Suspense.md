# Lazy Load y Suspense

Vamos a procurar que nuestra aplicación sea un poco más eficiente al momento de renderizar los componentes en el navegador y de diferir la carga de los módulos. Es recomendable que la primera página que carga nuestra aplicación no entre dentro de la estrategia de Lazy load. Primero vamos a exportar todas las pages desde un archivo barril con la estrategia de lazy load (Es importante que las páginas a las que le aplicamos la estrategia estén bajo el concepto de exportación por defecto):

```tsx
import { lazy } from 'react'

export { HomePage } from './home/index'

export const CharacterPage = lazy( () => import( './character' ) )
export const LoginPage = lazy( () => import( './login' ) )
```

Para poder renderizar la ruta cuando venimos desde un redirect, debemos usar un componente llamado `<Suspense />`, el caul nos permite renderizar un componente mientras se carga la página:

```tsx
...
import { ..., Suspense } from 'react'
import { HomePage, CharacterPage, LoginPage } from "./pages"


export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route ...>
                ...
                <Route path="/:characterId" element={
                    <Suspense fallback={ "Cargando" }>
                        <CharacterPage />
                    </Suspense>
                } />
            </Route>
            <Route path="/login" element={
                <Suspense fallback={ "Cargando" }>
                    <LoginPage />
                </Suspense>
            } />
        </Routes>
    )
}
```

___

| Anterior                                                               |                        | Siguiente                                                         |
| ---------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------- |
| [Formik: Validación eficiente](./P16T1_Formik_Validacion_eficiente.md) | [Readme](../README.md) | [Deploy con CircleCI y Vercel](./P18T1_Deploy_CircleCI_Vercel.md) |
