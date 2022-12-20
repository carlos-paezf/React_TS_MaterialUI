import { Alert, AlertColor, Snackbar, Typography } from '@mui/material'
import { FC } from 'react'


type NotificationProps = {
    open: boolean,
    message: string,
    severity?: AlertColor,
    handleClose: () => void
}


export const Notification: FC<NotificationProps> = ( { open, message, severity, handleClose } ) => {
    return (
        <Snackbar anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
            autoHideDuration={ 4000 }
            open={ open }
            onClose={ handleClose }>
            <Alert onClose={ handleClose } severity={ severity }>
                <Typography>
                    { message }
                </Typography>
            </Alert>
        </Snackbar>
    )
}