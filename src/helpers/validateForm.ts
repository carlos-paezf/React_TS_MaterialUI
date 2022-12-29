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
            .required( "La contraseña es requerida" )
            .min( 4, "La contraseña debe contener mínimo 4 caracteres" )
            .max( 20, "La contraseña debe contener máximo 20 caracteres" ),
    } )