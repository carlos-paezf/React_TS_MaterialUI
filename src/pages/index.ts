import { lazy } from 'react'


export { HomePage } from './home/index'


export const CharacterPage = lazy( () => import( './character' ) )
export const LoginPage = lazy( () => import( './login' ) )