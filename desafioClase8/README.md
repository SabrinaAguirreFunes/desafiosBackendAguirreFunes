# desafiosBackendAguirreFunes

#### Primer desafio complementario (carpeta _"desafioClase8"_)

Se creó una base de datos _"Cluster0"_ dentro de MongoDB Atlas y se crearon las colecciones _"carts"_, _"messages"_ y _"products"_ con sus respectivos _schemas_.

En base a las entregas anteriores, se migró al modelo de persistencia Mongo y mongoose reajustandose para que los servicios funcionarán con los mismos y eliminandose la persistencia por FileSystem.

De acuerdo a lo indicado en clase, no se incorporó DAO para este desafío.

#### Vistas

- ruta _/static_ -> muestra, utilizando unicamente handlebars, un vista con el listado de todos los productos
- ruta _/realtimeproducts_ -> muestra, utilizando en conjunto handlebars y websocket, una vista con:
  - un formulario para agregar productos
  - un formulario para eliminar un producto a partir de un id
  - un listado de todos los productos (el cual se actualiza automaticamente cada vez que se agrega o elimina un producto)

#### Rutas

- ruta GET _/api/products_ -> al no recibir un query, leerá el archivo de productos y devolverá la totalidad del mismo como un array en formato string.
- ruta GET _/api/products?limit=x_ -> recibirá por query un límite _x_ que definirá el límite de resultados a mostrar. Leerá el archivo de productos y devolverá la cantidad de productos solicitados en el query como un array en formato string.
- ruta GET _/api/products/:pid_ -> recibirá por params el pid (id de producto) y devolverá sólo el producto solicitado como un array con un único objeto en formato string.
- ruta POST _/api/products_ -> agregara un nuevo producto con los parametros recibidos del body (se recibira en formato json los datos del producto).
- ruta PUT _/api/products/:pid_ -> actualizara los campos del producto del id indicado con los datos recibidos del body (los mismos se recibiran en formato json desde el body)
- ruta DELETE _/api/products/:pid_ -> eliminara el producto del id indicado.

- ruta POST _/api/carts/_ -> creara un nuevo carrito con un id y un array vacio para los productos
- ruta GET _/api/carts/:cid_ -> devolvera los datos del carrito del id indicado por params.
- ruta POST _/api/carts/:cid/product/:pid_ -> agregara al carrito del id indicado en params, el producto del id indicado en params. Se guardara en el carrito solo el id del producto y una variable de cantidad. Si el producto ya existiera en ese carrito, se sumara 1 en la variable cantidad.

Se utilizaron las rutas para crear y modificar los productos y carritos mediante POSTMAN.

##### Pasos para ejecutar el servidor

- En primer instancia, se deberá modificar el código del archivo index.js, en el comando mongoose.connect (en la URL de la linea 19 de index.js) se deberá reemplazar la palabra _password_ por la contraseña proporcionada por el chat de la plataforma de coderhouse.
- Luego, en la terminal, se deberá entrar en la carpeta del desafío con el comando _"cd desafioClase8"._
- Una vez dentro de la carpeta se instalarán las dependencias con el comando: _"npm install"_
- Finalmente se podrá poner en marcha el servidor con el comando: _"npm run dev"_
