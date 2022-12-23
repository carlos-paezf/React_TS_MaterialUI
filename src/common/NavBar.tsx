import { ShoppingCartOutlined as ShoppingCartOutlinedIcon } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, Container, Grid, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemePalette } from '../helpers/util'
import { CartComponent } from './Cart'


const NavBar: FC = () => {
    const navigate = useNavigate()

    const [ open, setOpen ] = useState<boolean>( false )

    const handleStateViewDrawer = () => {
        setOpen( !open )
    }

    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position='fixed'
                className='navbar__glassmorphism'
                sx={ {
                    background: "rgba(0, 0, 0, 0.5)",
                    boxShadow: `0 1px 5px 0 ${ ThemePalette.LIGHT_LIME }`
                } }>
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item onClick={ () => navigate( '' ) } sx={ { cursor: 'pointer' } }>
                                <Typography>Ferrer - Rick & Morty</Typography>
                            </Grid>

                            <Grid item>
                                <Stack direction="row" spacing={ 2 }>
                                    <IconButton color="primary" onClick={ handleStateViewDrawer }>
                                        <Badge color="error" badgeContent={ 2 }>
                                            <ShoppingCartOutlinedIcon />
                                        </Badge>
                                    </IconButton>
                                    <Button variant='outlined'>Register</Button>
                                    <Button variant='contained' onClick={ () => navigate( 'login' ) }>Login</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>

            <CartComponent open={ open } handleStateViewDrawer={ handleStateViewDrawer } />
        </Box >
    )
}

export default NavBar