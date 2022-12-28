import { Menu as MenuIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, Container, Divider, Drawer, Grid, IconButton, List, ListItem, Stack, Toolbar, Typography } from '@mui/material'
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

    const [ mobileOpen, setMobileOpen ] = useState( false )

    const handleDrawerToggle = () => {
        setMobileOpen( !mobileOpen )
    }

    const drawer = (
        <Box onClick={ handleDrawerToggle } sx={ { textAlign: 'center' } } >
            <Typography variant="h6" onClick={ () => navigate( '' ) } sx={ { my: 2, cursor: 'pointer' } }>
                Ferrer - Rick & Morty
            </Typography>
            <Divider />
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={ { my: 5 } }>
                <Grid item sx={ { mx: 2, width: "100%" } }>
                    <Stack direction="column" spacing={ 4 }>
                        <IconButton color="primary" onClick={ handleStateViewDrawer }>
                            <Typography>Cart items: &nbsp;</Typography>
                            <Badge color="error" badgeContent={ 2 }>
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                        <Button variant='outlined'>Register</Button>
                        <Button variant='contained' onClick={ () => navigate( 'login' ) }>Login</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )

    const container = () => window.document.body

    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position='fixed'
                component="nav"
                className='navbar__glassmorphism'
                sx={ {
                    background: "rgba(0, 0, 0, 0.5)",
                    boxShadow: `0 1px 5px 0 ${ ThemePalette.LIGHT_LIME }`
                } }>
                <Toolbar>
                    <IconButton color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={ handleDrawerToggle }
                        sx={ { mr: 2, display: { sm: 'none' } } } >
                        <MenuIcon />
                    </IconButton>
                    <Container maxWidth="xl" sx={ { display: { xs: 'none', sm: 'block' } } }>
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

            <Box component="nav">
                <Drawer container={ container }
                    variant="temporary"
                    open={ mobileOpen }
                    onClose={ handleDrawerToggle }
                    ModalProps={ { keepMounted: true } }
                    sx={ {
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                        background: "rgba(0, 0, 0, 0.5)",
                        boxShadow: `0 1px 5px 0 ${ ThemePalette.LIGHT_LIME }`
                    } }
                    className='navbar__glassmorphism'>
                    { drawer }
                </Drawer>
            </Box>

            <CartComponent open={ open } handleStateViewDrawer={ handleStateViewDrawer } />
        </Box >
    )
}

export default NavBar