import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'


export const RouterLayout: FC = () => {
    return (
        <>
            <NavBar />
            <div style={ { marginTop: "3rem" } }>
                <Outlet />
            </div>
        </>
    )
}