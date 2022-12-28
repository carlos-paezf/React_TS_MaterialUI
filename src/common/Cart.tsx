import { CloseRounded as CloseRoundedIcon } from "@mui/icons-material"
import { Box, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material"
import { FC } from "react"
import { HorizontalCardComponent } from "../components"
import { ThemePalette } from "../helpers/util"
import { useAppSelector } from "../redux/hooks"
import { Character } from "../types"


type CartComponentProps = {
    open: boolean
    handleStateViewDrawer: () => void
}


export const CartComponent: FC<CartComponentProps> = ( { open, handleStateViewDrawer } ) => {
    const items = useAppSelector( ( state ) => state.cartReducer )

    return (
        <Drawer anchor="right" open={ open } className='navbar__glassmorphism'
            sx={ {
                background: "rgba(0, 0, 0, .1)",
                boxShadow: `0 1px 5px 0 ${ ThemePalette.LIGHT_LIME }`
            } }>
            <Box sx={ { width: '25em', p: 2 } }>
                <Stack direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    position="relative"
                    sx={ { mb: 1 } }>
                    <Typography variant="h5">Cart</Typography>
                    <IconButton onClick={ handleStateViewDrawer } sx={ { position: "absolute", right: 0 } }>
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>
                <Divider />

                {
                    ( !items || !items.length )
                        ? <Typography sx={ { m: 2 } }>No hay elementos en el carrito =(</Typography>
                        : items.map( character => <HorizontalCardComponent key={ character.id } { ...character } /> )
                }
            </Box>
        </Drawer>
    )
}