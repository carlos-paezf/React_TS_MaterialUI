# Iniciando nuestro Proyecto

Para la creación del proyecto hacemos uso del siguiente comando:

```txt
pnpm create vite
```

En las opciones que se muestran al ejecutar el comando anterior, establecemos el nombre del proyecto como `marketplace`, seleccionamos que sea un proyecto de `React`, con una variante de `TypeScript + SWC`. Una vez creado el proyecto, ingresamos al proyecto y ejecutamos el siguiente comando para instalar las dependencias necesarias:

```txt
pnpm install
```

Ejecutamos el proyecto con siguiente comando:

```txt
pnpm dev
```

Necesitamos instalar algunas librerías como punto inicial, por lo que ejecutamos el siguiente comando dentro del proyecto:

```txt
pnpm i react-router-dom@6 @emotion/react @emotion/styled @mui/icons-material @mui/material @babel/core@">=7.0.0 <8.0.0"  @emotion/core@0.x.x
```

## Consideraciones

Es importante que siempre sepamos administrar las extensiones de los archivos dentro de nuestro proyecto, puesto que al estar con la variante de TS, nuestro archivos que reproduzcan elementos React o que sean custom hooks, deben llevar de manera obligatoria la extensión `.tsx`, los demás archivos si pueden llevar la extensión `.ts`.

## Scaffolding

Nuestro proyecto tendrá la siguiente organización internamente:

```txt
- src
    - assets
    - common
    - components
    - config
    - context
    - helpers
    - pages
    - types
    App.tsx
```

___

| Anterior |                        | Siguiente                                            |
| -------- | ---------------------- | ---------------------------------------------------- |
|          | [Readme](../README.md) | [Theme Customization](./P2T1_Theme_Customization.md) |
