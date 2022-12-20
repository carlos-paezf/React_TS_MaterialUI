import { Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from "@mui/material"
import { FC } from "react"
import { Character } from "../../types"


export const CardComponent: FC<Character> = ( { image, name, status, species } ) => {
    return (
        <Card sx={ { maxWidth: "345px" } }>
            <CardMedia component="img"
                height="195"
                image={ image }
                alt={ name } />

            <CardContent>
                <Typography variant="h5" sx={ { mb: 1.5 } }>{ name }</Typography>
                <Divider />
                <Typography sx={ { mt: 1.5 } }>Especie: { species }</Typography>
                <Typography sx={ { mt: 1.5 } }>Estado: { status }</Typography>
            </CardContent>

            <CardActions>
                <Button variant="contained" fullWidth>Ver más</Button>
            </CardActions>
        </Card>
    )
}