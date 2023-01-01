# Deploy con CircleCI y Vercel

Vamos a intentar que CircleCI escuche una rama especifica de GitHub, construya y despliegue una versión en Vercel, y que este último nos mantenga disponible una URL. El procedimiento para lo anterior será el siguiente:

- Crear un token de acceso a un team en Vercel
- Probaremos el token de acceso
- Configuraremos el archivo `.yml` dentro de nuestro proyecto para usar CircleCI
- Configuraremos las variables de entornos a utilizar
- Modificaremos el archivo anterior para que pueda apuntar a Vercel

Iniciamos creando una cuenta en Vercel, en mi caso la enlace con mi cuenta de GitHub. Podemos crear un team desde las configuraciones de la cuenta, o podemos omitir el paso para continuar con la creación del token, al cual le asignamos un nombre clave, le definimos el scope, y determinamos la fecha de expiración. Una vez creado el token, lo copiamos y guardamos en algún lugar seguro, puesto que no lo volveremos a ver desde la aplicación.

Necesitamos instalar Vercel CLI, por lo que usaremos el siguiente comando:

```txt
pnpm i vercel -g 
```

Vamos a añadir un nuevo proyecto de prueba a Vercel dentro del dashboard que definamos (en mi caso defino mi dashboard personal), usando el siguiente comando:

```txt
vercel project add test --scope <nombre de usuario o team> --token <token>
```

Comprobamos que todo va bien si vemos un nuevo proyecto dentro del dashboard de Vercel en la aplicación web. Ya podemos eliminar el proyecto de prueba puesto que hemos comprobado que nuestro token funciona.

Si no tenemos una cuenta en CircleCI, procedemos a crearla o enlazarla con alguna otra plataforma, por ejemplo GitHub en el cual seleccionamos el repositorio sobre el que haremos la integración continua (CI). Para la configuración del archivo `config.yml` seleccionamos la opción *Faster: Commit a stater CI pipeline to a new branch*. Si vamos a nuestro repositorio en GitHub, tendremos una nueva rama con la configuración que permite conectar el repo con CircleCI:

```yml
# Use the latest 2.1 version of CircleCI pipeline process engine.
# See: https://circleci.com/docs/2.0/configuration-reference
version: 2.1

# Define a job to be invoked later in a workflow.
# See: https://circleci.com/docs/2.0/configuration-reference/#jobs
jobs:
  say-hello:
    # Specify the execution environment. You can specify an image from Dockerhub or use one of our Convenience Images from CircleCI's Developer Hub.
    # See: https://circleci.com/docs/2.0/configuration-reference/#docker-machine-macos-windows-executor
    docker:
      - image: cimg/base:stable
    # Add steps to the job
    # See: https://circleci.com/docs/2.0/configuration-reference/#steps
    steps:
      - checkout
      - run:
          name: "Say hello"
          command: "echo Hello, World!"

# Invoke jobs via workflows
# See: https://circleci.com/docs/2.0/configuration-reference/#workflows
workflows:
  say-hello-workflow:
    jobs:
      - say-hello
```

Dentro del dashboard de CircleCI, iremos a la sección de variables de entorno dentro de la configuración del pipeline, y añadimos las siguientes variables:

| Variable            | Valor                                                                |
| ------------------- | -------------------------------------------------------------------- |
| VERCEL_PROJECT_NAME | marketplace (nombre que configuramos dentro del package.json)        |
| VERCEL_TOKEN        | `<token de vercel>`                                                  |
| VERCEL_SCOPE        | `<scope determinado en al momento de agregar el proyecto en Vercel>` |

Ahora vamos a la sección de *Configuration File* dentro de nuestro proyecto en CircleCI y copiamos la siguiente configuración reemplazando la anterior (importante que trabajemos sobre la rama generada por el mismo pipeline, puesto que no queremos que corra una vez configurado):

```yml
version: 2.1

jobs:
    install-dependencies:
        working_directory: ~/repo
        docker:
            - image: cimg/node:16.13.2
        steps:
            - checkout
            - run:
                name: Update or install NPM
                command: 'sudo npm install -g npm'
            - run:
                name: Install pnpm
                command: 'sudo npm install -g pnpm'
            - restore_cache:
                key: app-{{ checksum "pnpm-lock.yaml" }}
            - run:
                name: Install Dependencies
                command: pnpm install
            - persist_to_workspace:
                root: .
                paths:
                    - .
    vercel-deploy:
        build:
        working_directory: ~/repo
        docker:
            - image: cimg/node:16.13.2
        steps:
            - checkout
            - run:
                name: Install Vercel CLI
                command: 'sudo npm install -g vercel'
            - attach_workspace:
                at: .
            - run:
                name: Vercel Prod Deploy
                command: vercel --prod --build-env VITE_APP_BASEURL=https://rickandmortyapi.com/api --name $VERCEL_PROJECT_NAME --scope $VERCEL_SCOPE --token=$VERCEL_TOKEN --yes

workflows:
    version: 2
    deploy-reactapp:
        jobs:
            - install-dependencies:
                filters:
                    branches:
                        only:
                            - develop
            - vercel-deploy:
                requires:
                    - install-dependencies
                filters:
                    branches:
                        only:
                            - develop
```

Guardamos y corremos el archivo, y hacemos commit dentro de la misma rama de configuración del archivo, lo cual debe representarse dentro del dashboard con la etiqueta de `Created`. Ahora, dentro de nuestro repositorio hacemos un pull request desde la rama `main` como base y comparada con la rama `circleci-project-setup`, y creamos una rama llamada `develop` y ejecutamos otro pull request desde el `develop` comparado con `main`. De manera automática CircleCI ejecuta los jobs que definimos en la parte anterior y podremos observar dentro del dashboard de Vercel que el proyecto ya ha logrado su despliegue. Cuando necesitamos actualizar esta aplicación hacemos los cambios dentro del repositorio en la rama `main` y luego hacemos un pull request a la rama `develop` comparada con la rama en la que estamos desarrollando (solo aplica para el caso de este proyecto, todo depende de la manera en la que estamos trabajando en el proyecto con el equipo o de manera individual).

> Es importante aclarar que `develop` es solo una el nombre de una rama, podemos llamarla como queramos, pero en este caso se hace con el fin de simular que en esa rama observaremos lo que hagamos en desarrollo, podemos destinar otras ramas para pruebas o producción.

Intentemos lo siguiente, convirtamos la url de la API que estamos usando en una variable de entorno, por lo tanto vamos a crear un archivo `.env` y añadimos la siguiente variable de entorno (como estoy haciendo uso de Vite, es importante que la variable de entorno lleve ese prefijo):

```txt
VITE_APP_BASEURL = "'https://rickandmortyapi.com/api'"
```

Posteriormente, dentro del archivo `base.api.ts` llamamos la variable de la siguiente manera (esto es por que usamos Vite):

```ts
import axios from "axios"

const baseURL = import.meta.env.VITE_APP_BASEURL

export const instance = axios.create( {
    baseURL
} )
```

Lo que podremos observar, es que dentro del archivo de configuración del pipeline, hemos determinado el valor de variable de entorno, para que se pueda interpretar dentro de nuestro proyecto, ya que los archivos `.env` han sido omitidos en el despliegue.

Una vez actualizada la rama `circleci-project-setup`, y la rama `develop`, CircleCI intentará volver a lanzar la aplicación para reconocer los cambios aplicados, y por lo tanto podremos tener nuestra aplicación actualizada.

___

| Anterior                                              |                        | Siguiente |
| ----------------------------------------------------- | ---------------------- | --------- |
| [Lazy load y Suspense](./P17T1_Lazy_load_Suspense.md) | [Readme](../README.md) |           |
