import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { ThemeConfig } from './config/theme.config'
import './index.css'
import { store } from './redux/store'


ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
    <React.StrictMode>
        <Provider store={ store }>
            <ThemeConfig>
                <App />
            </ThemeConfig>
        </Provider>
    </React.StrictMode>,
)
