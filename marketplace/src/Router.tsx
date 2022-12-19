import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import { RouterLayout } from "./common/RouterLayout"
import { HomePage } from "./pages/home"
import { LoginPage } from "./pages/login"


export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path="/" element={ <RouterLayout /> }>
                <Route path="/" element={ <HomePage /> } />
            </Route>
            <Route path="/login" element={ <LoginPage /> } />
        </Routes>
    )
}