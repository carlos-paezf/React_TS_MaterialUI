import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface CartState {
    id: string | number
    name: string
    image: string
    origen: string
}


const initialState: CartState[] = []


export const cartSlice = createSlice( {
    name: 'cart',
    initialState,
    reducers: {
        addToCart: ( state, action: PayloadAction<CartState> ) => { },
        removeToCart: ( state, action: PayloadAction<CartState> ) => { }
    }
} )


export const { } = cartSlice.actions
