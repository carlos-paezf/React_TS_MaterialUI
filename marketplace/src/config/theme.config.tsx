import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { FC } from "react"
import { ThemePalette } from "../helpers/util"
import type { ThemeProps } from "../types"


/* Creating a theme object that is being passed to the ThemeProvider component. */
const theme = createTheme( {
    palette: {
        mode: 'dark',
        background: {
            default: ThemePalette.BG
        },
        primary: {
            main: ThemePalette.LIME
        }
    },
    typography: {
        fontFamily: ThemePalette.FONT_GLOBAL
    },
    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    textTransform: "none",
                    boxShadow: "none",
                    borderRadius: ".5em",
                    wordSpacing: "5px",
                    letterSpacing: ".75px"
                }
            }
        },
        MuiAlert: {
            defaultProps: {
                style: {
                    borderRadius: ".8em",
                    fontSize: "1em",
                }
            },
            styleOverrides: {
                standardError: {
                    border: `1px solid ${ ThemePalette.ERROR_MAIN }`,
                    background: ThemePalette.BG_ERROR_MAIN
                }
            }
        }
    }
} )


/**
 * ThemeConfig is a function that takes in a child component and returns a ThemeProvider component with
 * a theme and a CssBaseline component as children.
 * @param  - FC<ThemeProps> - This is a React component that takes a generic type. The generic type is
 * the props that the component will receive.
 * @returns The ThemeProvider is being returned with the theme and the CssBaseline.
 */
export const ThemeConfig: FC<ThemeProps> = ( { children } ) => {
    return (
        <ThemeProvider theme={ theme }>
            <CssBaseline />
            { children }
        </ThemeProvider>
    )
}