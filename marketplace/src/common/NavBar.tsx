import { AppBar, Box, Button, Container, Grid, Stack, Toolbar, Typography } from '@mui/material'
import { FC } from 'react'
import { ThemePalette } from '../helpers/util'


const NavBar: FC = () => {
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
                            <Grid item>
                                <Typography>Ferrer</Typography>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" spacing={ 2 }>
                                    <Button variant='outlined'>Register</Button>
                                    <Button variant='contained'>Login</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default NavBar