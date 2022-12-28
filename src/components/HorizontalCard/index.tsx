import { CloseRounded as CloseRoundedIcon } from '@mui/icons-material'
import { Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Typography } from "@mui/material"
import { FC } from "react"
import { useAppDispatch } from '../../redux/hooks'
import { removeToCart } from '../../redux/slices/cart.slice'


type Props = {
    id: string | number
    name: string
    image: string
    info: string
}


export const HorizontalCardComponent: FC<Props> = ( { id, name, image, info } ) => {
    const dispatch = useAppDispatch()

    const handleRemoveToCart = () => {
        dispatch( removeToCart( { id } ) )
    }

    return (
        <Card sx={ { display: "flex", my: 2 } }>
            <CardMedia component="img" sx={ { width: 151 } } image={ image } alt={ name } />

            <Grid container sx={ { mx: 1 } }>
                <Grid item xs={ 10 }>
                    <CardContent>
                        <Typography variant="h4">{ name }</Typography>
                        <Divider />
                        <Typography variant="h6">{ info }</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={ 2 }>
                    <CardActions>
                        <IconButton onClick={ handleRemoveToCart }>
                            <CloseRoundedIcon />
                        </IconButton>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    )
}