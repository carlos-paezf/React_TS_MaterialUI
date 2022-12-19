import { AlertColor } from "@mui/material"
import { createContext, FC, useContext, useState } from "react"
import { Notification } from '../components'


type ContextProps = {
    getError: ( msg: string ) => void
}


const NotificationContext = createContext<ContextProps | null>( null )


export const NotificationProvider: FC<{ children: JSX.Element }> = ( { children } ) => {
    const [ message, setMessage ] = useState<string>( '' )
    const [ open, setOpen ] = useState<boolean>( false )
    const [ severity, setSeverity ] = useState<AlertColor | undefined>()

    /**
     * GetError is a function that takes a string and returns a function that takes no arguments and
     * returns nothing.
     * @param {string} msg - string - The message to display
     */
    const getError = ( msg: string ): void => {
        setSeverity( "error" )
        setOpen( true )
        setMessage( msg )
    }

    /**
     * When the user clicks the close button, the modal will close.
     */
    const handleClose = (): void => {
        setOpen( false )
    }

    const value = { getError }

    return (
        <NotificationContext.Provider value={ value }>
            <Notification message={ message }
                severity={ severity }
                open={ open }
                handleClose={ handleClose } />
            { children }
        </NotificationContext.Provider>
    )
}


/**
 * UseNotification is a function that returns the context object from the NotificationContext.
 * @returns The context object.
 */
export const useNotification = () => {
    const context = useContext( NotificationContext )

    if ( !context ) throw new Error( `No existe contexto` )

    return context
}