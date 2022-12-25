import { Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material"
import { FC, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Character } from "../../types"
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addToCart } from "../../redux/slices/cart.slice"


export const CardComponent: FC<Character> = ( { id, image, name, status, species, origin } ) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [ disableBtn, setDisableBtn ] = useState<boolean>( false )
    const itemExist = useAppSelector( ( state ) => state.cartReducer )

    useEffect( () => {
        setDisableBtn( itemExist.some( item => item.id === id ) )
    }, [ itemExist, id ] )

    const handleAddToCart = () => {
        dispatch( addToCart( {
            id,
            name,
            image,
            info: origin.name
        } ) )
    }

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
                <Button variant="outlined" onClick={ handleAddToCart } color="secondary" disabled={ disableBtn } fullWidth>Add to cart</Button>
            </CardActions>
        </Card>
    )
}