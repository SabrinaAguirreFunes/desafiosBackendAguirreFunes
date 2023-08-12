# desafiosBackendAguirreFunes

#### Tercera entrega (carpeta _"desafioClase4"_)

Se utilizó las clases "ProductManager" y "Product", con sus métodos, creados en el desafío anterior (desafioClase3)

Se crearon productos con las mencionadas clases en el archivo appDesafioClase4.js para que puedan realizarse las pruebas en el servidor local creado en este desafío.

Se realizó el desarrollo de un servidor basado en express con los siguientes endpoints:

- ruta _/products_ -> al no recibir un query, leerá el archivo de productos y devolverá la totalidad del mismo como un array en formato string.
- ruta _/products?limit=x_ -> recibirá por query un límite _x_ que definirá el límite de resultados a mostrar. Leerá el archivo de productos y devolverá la cantidad de productos solicitados en el query como un array en formato string.
- ruta _/products/:pid_ -> recibirá por paramas el pid (id de producto) y devolverá sólo el producto solicitado como un array con un único objeto en formato string.

##### Pasos para ejecutar el servidor

- Primero se deberá entrar en la carpeta del desafío con el comando _"cd desafioClase4"._
- Una vez dentro de la carpeta se instalarán las dependencias con el comando: _"npm install"_
- Finalmente se podrá poner en marcha el servidor con el comando: _"npm run dev"_
