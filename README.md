# ¿Cómo probarlo?
Si solamente quieres probar cómo funciona con una cuenta genérica, he creado esta cuenta en spotify:

correo: aimyplaylist@gmail.com
contraseña: testaimyplaylist1

Por otro lado, para usarlo con tu propia cuenta tendrás que seguir las intrucciones que he dejado más adelante.
# ¿Cómo funciona?
Spotify tiene una nueva funcionalidad en la que se pueden crear playlists a partir de un prompt. Basicamente se genera una playlist desde cero y el usuario puede decidir hacer mas modificaciones a partir de esta playlist que se creó. Sin embargo, no existe una funcionalidad en la que el usuaio pueda modificar una playlist de su perfil ya existente con AI o crear una nueva playlist que además del prompt pueda tener una playlist que yo quiera como contexto. Además la funcionalidad de AI de Spotify está limitada a solo usuarios premium y no está disponible en todas las regiones por ahora. Por eso AI My Playlist ofrece 4 funcionalidades para crear una playlist o modificar una ya existente:

- Create playlist from scratch: Esta funcionalidad es parecida a la de spotify en la que el usuario escribe un prompt y la aplicación crea una playlist nueva y le adiciona canciones basado en el prompt.

https://github.com/user-attachments/assets/75a8c51c-8b57-46b0-941f-39b9cc296369

- Create playlist from selected playlist: Esta funcionalidad permite crear una playlist nueva usando las canciones de la playlist seleccionada.

https://github.com/user-attachments/assets/e475a273-6f87-4646-be5a-c20694090b9f

- Create playlist with new songs from selected: Esta funcionalidad permite crear una playlist nueva usando como contexto una playlist seleccionada pero agregando nuevas canciones.


https://github.com/user-attachments/assets/3bf6945b-d59b-4b0a-acca-02be1a92be5a

- Remove songs from selected playlist: Esta funcionalidad permite borrar canciones de la lista seleccionada modificando la misma.


https://github.com/user-attachments/assets/f26466a2-3e28-4deb-908e-45f71a14ca60

- Add songs to selected playlist: Esta funcionalidad permite agregar nuevas canciones a la lista seleccionada modificando la misma.


https://github.com/user-attachments/assets/bf38e93b-d68c-4edc-acda-d314d64233f3

# Instrucciones de Configuración

Desafortunadamente Spotify tiene una limitacion para las apps que se conectan con su API habiendo dos modos: developer mode y extended quota mode. Con el developer mode solo los usuarios que yo escoja pueden usar la app. Ya hice la solicitud de la extension pero Spotify dice que puede demorar hasta 6 semanas. Si quieres probar la app hay dos pciones. La primera sería que me mandaras tu correo electronico de la cuenta de tu Spotify (podrias crear una cuenta gratis solo para esto no es necesario que sea premium) y yo te agrego. Me lo puedes mandar a samuelgomez4010@gmail.com.

La otra opción es un poco más engorrosa pero sería clonarse el repositorio y correr el cliente y el servidor y hacer algunas modificaciones:
Es necesario crear una aplicacion en el dashboard de spotify para developers en este link: https://developer.spotify.com/dashboard

Cuando se crea una app nueva es importante escribir como RedirectURI el link en donde estara el cliente. Si es local por ejemplo http://localhost:5173 y escoger la opcion Web API

![Screenshot 2024-08-06 134938](https://github.com/user-attachments/assets/d74fa044-d327-452c-a27a-e5b73f5d166d)


Luego en el servidor es necesario adicionar un env file con estas variables:
CLIENT_ID: Asignada por Spotify cuando se crea una app nueva
CLIENT_SECRET= Asignada por Spotify cuando se crea una app nueva
REDIRECT_URI= La misma que se puso cuando se creo la app en el dashboard de Spotify.

Con estos pasos ya se podria usar la app.

El otro requerimiento es poner una APIKEY de gemini. Esta key queda guardada en el localstorage y no es usada de ninguna manera en el servidor solo se queda en el cliente. Gemini tiene una ocion gratis que es suficiente para usar la app para listas que tienen menos de 500 canciones para no tener un problema de rate limit y lo bueno es que la key no va a generar nongun cobro si uno no lo desea. Puedes conocer mas aqui: https://ai.google.dev/gemini-api/docs/api-key https://ai.google.dev/pricing

![image](https://github.com/user-attachments/assets/f4091193-b5e4-4d92-af66-e5f83a81c613)
