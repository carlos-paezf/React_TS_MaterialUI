# Formik: Validación eficiente

Cuando hicimos validaciones con Yup, aplicamos validaciones al formulario de login, pero la retroalimentación de los errores no era muy buena, puesto que se mostraba el error del último campo que fallará, y no todos los campos cómo debería. Lo que haremos será usar la librería Formik para aplicar las validaciones de formularios. Para su instalación usamos el siguiente comando:

```txt
pnpm i formik
```

Para su implementación ya tenemos una parte ganada en nuestro proyecto, puesto que estamos usando Yup para las validaciones de los campos, y Material UI para la interfaz gráfica, por lo tanto solo nos resta usar el hook `useFormik`, y usar sus propiedades dentro del formulario.

Recordemos el objeto con las validaciones de Yup:

```tsx
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
```

Dentro del componente `<LoginPage />` usamos el hook mencionado anteriormente, y para facilitar un poco el trabajo, aplicamos desestructuración para obtener algunos método y objetos que usaremos directamente en el formulario:

```tsx
export const LoginPage: FC = () => {
    const { getSuccess } = useNotification()

    const { handleSubmit, handleChange, values, touched, errors } = useFormik<LoginType>( {
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginValidate,
        onSubmit: ( values ) => {
            getSuccess( JSON.stringify( { ...values }, null, 4 ) )
        }
    } )

    const { email, password } = values

    return (
        <Container ...>
            <Grid ...>
                <Grid item>
                    <Paper ...>
                        ...

                        <Box component="form" onSubmit={ handleSubmit }>
                            <TextField name="email"
                                value={ email } onChange={ handleChange }
                                error={ touched.email && Boolean( errors.email ) }
                                helperText={ touched.email && errors.email }
                                ... />
                            <TextField name="password"
                                value={ password } onChange={ handleChange }
                                error={ touched.password && Boolean( errors.password ) }
                                helperText={ touched.password && errors.password }
                                ... />
                                ...
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
```

Cada que enviamos nuestro formulario, si tenemos errores nos mostrará un texto de ayuda indicando cual es el error, y desaparecen cuando están corregidos.

___

| Anterior                                                                  |                        | Siguiente                                             |
| ------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------- |
| [Redux - Store en el Local Storage](./P15T1_Redux_Store_Local_Storage.md) | [Readme](../README.md) | [Lazy load y Suspense](./P17T1_Lazy_load_Suspense.md) |
