# desafiosBackendAguirreFunes

#### Segunda entrega (carpeta _"desafioClse3"_)

Se realizó la creación de una clase "ProductManager" la cual gestionará un conjunto de productos.

La misma incluye un constructor con el elemento 'products' siendo un array vacío. Cada product se creara con la clase "Product" mediante un constructor que contaran con las propiedades de:

- title
- description
- price
- thumbnail
- code
- stock
- id

El campo de id se generara automaticamente mediante un metodo de clase, incrementandose automaticamente con cada nuevo elemento

A su vez se crearon los siguientos metodos:

- _addProduct_ -> chequeara que el campo code no se repita para validar que el producto no exista, si no existe agregara un producto al array 'products'. En caso de que ese producto ya exista en el array devolvera una mensaje de error.
- _getProducts_ -> devolvera todos los productos creados hasta ese momento.
- _getProductById_ -> buscar en el array el producto que coincida con el id que se le otorgue y lo devolvera. En caso de no encontrar ningun producto que coincida con el id requerido devolvera un mensaje de error.
- _updateProducts_ -> buscara en el array el producto que coincida con el id y modificara el campo del producto que se desea actualizar.
- _deleteProducts_ -> buscara en el array el producto que coincida con el id y lo eliminara.

Se realizaron pruebas en el archivo indexDesafioClase3.js

_Para ejecutar estas pruebas es necesario correr en consola el siguiente comando: "node desafioClase3/src/indexDesafioClase3.js"_
