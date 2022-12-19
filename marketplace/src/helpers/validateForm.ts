import * as yup from 'yup'


export const LoginValidate = yup
    .object()
    .shape( {
        email: yup
            .string()
            .trim()
            .required( "El correo es requerido" ),
        password: yup
            .string()
            .trim()
            .required( "La contraseña es requerida" ),
    } )