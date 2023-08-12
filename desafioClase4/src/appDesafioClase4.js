import express from "express";
import { ProductManager, Product } from "./productManager.js";

const PORT = 8080;

const app = express();

let products = new ProductManager("./data/products.json");

app.get("/", (req, res) => {
  res.send(
    "Bienvenido al desafio de la clase 4. Por favor dirigirse a la ruta de su eleccion de las siguientes 3 opciones: /products o /products/'id que desea consultar' o /products?limit='cantidad de productos que desea mostrar'"
  );
});

app.get("/products", async (req, res) => {
  const prods = await products.getProducts();

  const { limit } = req.query;

  if (limit) {
    const limitedProds = prods.slice(0, parseInt(limit));

    res.send(limitedProds);
  } else {
    res.send(prods);
  }
});

app.get("/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);

  const prod = await products.getProductsById(id);

  if (prod) {
    res.send(prod);
  } else {
    res.send("Product not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

//Creacion de productos para poder ejecutar pruebas del desafío 3

//Se crearon los productos con el archivo 'products.json' ya creado con solo un array vacio.

const product1 = new Product(
  "producto prueba",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc123",
  25
);
const product2 = new Product(
  "producto prueba 2",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc124",
  25
);
const product3 = new Product(
  "producto prueba 3",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc125",
  25
);
const product4 = new Product(
  "producto prueba 4",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc126",
  25
);
const product5 = new Product(
  "producto prueba 5",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc127",
  25
);
const product6 = new Product(
  "producto prueba 6",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc128",
  25
);
const product7 = new Product(
  "producto prueba 7",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc129",
  25
);
const product8 = new Product(
  "producto prueba 8",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc130",
  25
);
const product9 = new Product(
  "producto prueba 9",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc131",
  25
);
const product10 = new Product(
  "producto prueba 10",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc132",
  25
);
const product11 = new Product(
  "producto prueba 11",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc133",
  25
);
const product12 = new Product(
  "producto prueba 12",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc134",
  25
);
const product13 = new Product(
  "producto prueba 13",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc135",
  25
);

// products.addProduct(product1);
// products.addProduct(product2);
// products.addProduct(product3);
// products.addProduct(product4);
// products.addProduct(product5);
// products.addProduct(product6);
// products.addProduct(product7);
// products.addProduct(product8);
// products.addProduct(product9);
// products.addProduct(product10);
// products.addProduct(product11);
// products.addProduct(product12);
// products.addProduct(product13);

// products.updateProduct(4, {
//   title: "producto prueba MODIFICACION 2",
//   description: "este es un MODIFICACION prueba",
//   price: 200,
//   thumbnail: "sin imagen",
//   code: "abc126",
//   stock: 25,
// });
