import { Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Typography } from "@mui/material"
import { FC } from "react"
import { Character } from "../../types"
import { CloseRounded as CloseRoundedIcon } from '@mui/icons-material'


export const HorizontalCardComponent: FC<Character> = ( { name, image, status, origin } ) => {
    return (
        <Card sx={ { display: "flex", my: 2 } }>
            <CardMedia component="img" sx={ { width: 151 } } image={ image } alt={ name } />

            <Grid container sx={ { mx: 1 } }>
                <Grid item xs={ 10 }>
                    <CardContent>
                        <Typography variant="h4">{ name }</Typography>
                        <Divider />
                        <Typography variant="h6">{ status }</Typography>
                        <Typography variant="h6">{ origin.name }</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={ 2 }>
                    <CardActions>
                        <IconButton >
                            <CloseRoundedIcon />
                        </IconButton>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    )
}