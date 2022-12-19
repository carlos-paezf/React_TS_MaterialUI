import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import "./App.css"
import { NotificationProvider } from './context/notification.context'
import { AppRouter } from './Router'


const App: FC = () => {
    return (
        <NotificationProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </NotificationProvider>
    )
}


export default App
