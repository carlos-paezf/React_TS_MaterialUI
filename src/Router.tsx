import { FC, Suspense } from 'react'
import { Route, Routes } from "react-router-dom"
import { RouterLayout } from "./common/RouterLayout"
import { HomePage, CharacterPage, LoginPage } from "./pages"


export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path="/" element={ <RouterLayout /> }>
                <Route path="/" element={ <HomePage /> } />
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