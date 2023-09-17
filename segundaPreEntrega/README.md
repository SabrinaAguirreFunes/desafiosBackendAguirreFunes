# desafiosBackendAguirreFunes

#### Segunda Pre Entrega (carpeta _"segundaPreEntrega"_)

En base a las entregas anteriores, se modifico el metodo GET para que recibiera por query params, de manera opcional, un _limit_, una _page_, un _sort_, y un _query_ (el mismo puede ser para filtrar por _category_ o _status_).

De acuerdo a lo indicado en clase, no se desarrallaron las nuevas vistas ni los _prevLink_ y _nextLink_ para esta entrega.

#### Vistas

- ruta _/static_ -> muestra, utilizando unicamente handlebars, un vista con el listado de todos los productos
- ruta _/realtimeproducts_ -> muestra, utilizando en conjunto handlebars y websocket, una vista con:
  - un formulario para agregar productos
  - un formulario para eliminar un producto a partir de un id
  - un listado de todos los productos (el cual se actualiza automaticamente cada vez que se agrega o elimina un producto)
- ruta _/chat_ -> muestra, utilizando en conjunto handlebars y websocket, una vista con:
  - un formulario para enviar mensajes
  - un listado de todos los mensajes en la base de datos (el cual se actualiza automaticamente cada vez que se agrega un mensaje)

#### Rutas

- ruta GET _/api/products_ -> al no recibir un query, leerá el archivo de productos y devolverá la totalidad del mismo como un array en formato string.
- ruta GET _/api/products?limit=x&page=x&sort=x&category=x_ o _/api/products?limit=x&page=x&sort=x&status=x_-> podra recibir por query un límite _x_ que definirá el límite de resultados a mostrar, una page _x_ que determinara que pagina mostrara, un sort _x_ que ordenara los productos por precio segun se indique, una category o un status _x_ para filtrar los resultados que se desean ver. Todos estos parametros recibidos por query son _opcionales_. En caso de no indicarse, por default el limit sera 10, el page sera 1, el sort no realizara ordenamiento, y, si no se indica ni category ni status, no se filtrara y se realizara una busqueda general. Se leerá el archivo de productos y devolverá mediante el metodo paginate la informacion filtrada, paginada y ordenada segun los parametros solicitados.
- ruta GET _/api/products/:pid_ -> recibirá por params el pid (id de producto) y devolverá sólo el producto solicitado como un array con un único objeto en formato string.
- ruta POST _/api/products_ -> agregara un nuevo producto con los parametros recibidos del body (se recibira en formato json los datos del producto).
- ruta PUT _/api/products/:pid_ -> actualizara los campos del producto del id indicado con los datos recibidos del body (los mismos se recibiran en formato json desde el body)
- ruta DELETE _/api/products/:pid_ -> eliminara el producto del id indicado.

- ruta POST _/api/carts/_ -> creara un nuevo carrito con un id y un array vacio para los productos
- ruta GET _/api/carts/:cid_ -> devolvera los datos del carrito del id indicado por params.
- ruta POST _/api/carts/:cid/product/:pid_ -> agregara al carrito del id indicado en params, el producto del id indicado en params. Se guardara en el carrito solo el id del producto y una variable de cantidad. Si el producto ya existiera en ese carrito, se sumara 1 en la variable cantidad.
- ruta DELETE _/api/carts/:cid_ -> eliminara los productos del carrito del id indicado por params (pasara a ser products un array vacio como al crear un carrito).
- ruta DELETE _/api/carts/:cid/product/:pid_ -> eliminar el producto del id indicado en params del carrito del id indicado en params.
- ruta PUT _/api/carts/:cid_ -> actualizara el array de productos del carrito del id indicado por params con el array de productos pasado en el body.
- ruta PUT _/api/carts/:cid/product/:pid_ -> actualiara unicamente la cantidad del producto del id indicado en params del carrito del id indicado en params.

Se utilizaron las rutas para crear y modificar los productos y carritos mediante POSTMAN.

##### Pasos para ejecutar el servidor

- En primer instancia, se deberá crear, a la altura del archivo .gitignore, un archivo .env donde debera copiarse la informacion proporcionada por el chat de la plataforma de coderhouse.
- Luego, en la terminal, se deberá entrar en la carpeta del desafío con el comando _"cd segundaPreEntrega"._
- Una vez dentro de la carpeta se instalarán las dependencias con el comando: _"npm install"_
- Finalmente se podrá poner en marcha el servidor con el comando: _"npm run dev"_
