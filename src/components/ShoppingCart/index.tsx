import { ShoppingCartOutlined as ShoppingCartOutlinedIcon } from '@mui/icons-material'
import { Badge, IconButton, Stack, Typography } from '@mui/material'
import { FC } from "react"


type Props = {
    handleStateViewDrawer: () => void
    itemsCount: number
}


export const ShoppingCartComponent: FC<Props> = ( { handleStateViewDrawer, itemsCount } ) => {
    return (
        <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography sx={ { display: { sm: 'none' } } }>Cart items:</Typography>
            <IconButton color="primary" onClick={ handleStateViewDrawer }>
                <Badge color="error" badgeContent={ itemsCount }>
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </IconButton>
        </Stack>
    )
}