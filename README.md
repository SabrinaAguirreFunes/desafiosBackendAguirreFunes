# desafiosBackendAguirreFunes

Primera entrega (rama "desafio-1"):

    Se realizó la creación de una clase "ProductManager" la cual gestionará un conjunto de productos:

        La misma incluye un constructor con el elemento products siendo un array vacío. Cada product cuenta con las propiedades de:
                                - title
                                - description
                                - price
                                - thumbnail
                                - code
                                - stock
                                - id

        A su vez se crearon los siguientos metodos:
                                                    - addProduct -> agregara un producto al array `products` inicial siendo obligatorio todas los campos de las propiedades mencionadas anteriormente con excepcion del id que se generara automaticamente incrementandose automaticamente con cada nuevo elemento y el price que se obtendra mediante formula multiplicando el consumo del producto por el precio por consumo
                                                    - getProducts -> devolvera todos los productos creados hasta ese momento
                                                    - getProductById -> buscar en el array el producto que coincida con el id que se le otorgue y lo devolvera. En caso de no encontrar ningun producto que coincida con el id requerido devolvera un mensaje de error.

    Se realizaron pruebas de todo esto en el archivo index.js

    Para ejecutar estas pruebas es necesario correr en consola el siguiente comando: "node src/index.js"