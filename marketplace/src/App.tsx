import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './Router'
import "./App.css"


const App: FC = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}


export default App
