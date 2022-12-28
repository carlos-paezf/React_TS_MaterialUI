import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface CartAddState {
    id: string | number
    name: string
    image: string
    info: string
}

interface CartRemoveState {
    id: string | number
}


const initialState: CartAddState[] = []


export const cartSlice = createSlice( {
    name: 'cart',
    initialState,
    reducers: {
        addToCart: ( state, action: PayloadAction<CartAddState> ) => {
            if ( !state.length || state.every( item => item.id !== action.payload.id ) ) {
                state.push( action.payload )
            }
        },
        removeToCart: ( state, action: PayloadAction<CartRemoveState> ) => {
            if ( state.some( ( item => item.id === action.payload.id ) ) )
                return state.filter( item => item.id !== action.payload.id )
        }
    }
} )


export const { addToCart, removeToCart } = cartSlice.actions
