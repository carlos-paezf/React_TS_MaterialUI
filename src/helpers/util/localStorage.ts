export const getItem = ( key: string ) => {
    return JSON.parse( localStorage.getItem( key )! ) ?? []
}


export const setItem = ( key: string, value: unknown ) => {
    return localStorage.setItem( key, JSON.stringify( value ) )
}