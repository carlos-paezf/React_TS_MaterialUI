import { Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { Character } from "../../types"


export const CardComponent: FC<Character> = ( { id, image, name, status, species } ) => {
    const navigate = useNavigate()

    return (
        <Card sx={ { maxWidth: "345px" } }>
            <CardMedia component="img"
                height="300"
                image={ image }
                alt={ name } />

            <CardContent>
                <Typography variant="h5" sx={ { mb: 1.5 } }>{ name }</Typography>
                <Divider />
                <Typography sx={ { mt: 1.5 } }>Especie: { species }</Typography>
                <Typography sx={ { mt: 1.5 } }>Estado: { status }</Typography>
            </CardContent>

            <CardActions>
                <Button variant="contained" onClick={ () => navigate( `/${ id }` ) } fullWidth>Ver más</Button>
                <Button variant="outlined" color="secondary" fullWidth disabled>Add to cart</Button>
            </CardActions>
        </Card>
    )
}