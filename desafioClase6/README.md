# desafiosBackendAguirreFunes

#### Cuarto desafio (carpeta _"desafioClase6"_)

A partir del proyecto entregado en la primer pre-entrega, se configuro el servidor para integrar el motor de plantillas "Handlebars" instalando un servidor de socket.io.

- ruta _static_ -> muestra, utilizando unicamente handlebars, un vista con el listado de todos los productos
- ruta _realtimeproducts_ -> muestra, utilizando en conjunto handlebars y websocket, una vista con:
  - un formulario para agregar productos
  - un formulario para eliminar un producto a partir de un id
  - un listado de todos los productos (el cual se actualiza automaticamente cada vez que se agrega o elimina un producto)

##### Pasos para ejecutar el servidor

- Primero se deberá entrar en la carpeta del desafío con el comando _"cd desafioClase6"._
- Una vez dentro de la carpeta se instalarán las dependencias con el comando: _"npm install"_
- Finalmente se podrá poner en marcha el servidor con el comando: _"npm run dev"_
