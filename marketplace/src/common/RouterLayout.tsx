import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'


export const RouterLayout: FC = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}