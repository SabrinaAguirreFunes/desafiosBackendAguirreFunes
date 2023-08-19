import { ProductManager } from "./productManager.js";

//Pruebas para desafío 1

let products = new ProductManager();

products.getProducts();

products.addProduct({
  title: "producto prueba",
  description: "este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25,
});

products.getProducts();

products.addProduct({
  title: "producto prueba",
  description: "este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25,
});

products.getProductsById(5);

products.addProduct({
  title: "producto prueba 2",
  description: "este es un producto prueba",
  price: 50,
  thumbnail: "sin imagen",
  code: "abc124",
  stock: 25,
});
products.addProduct({
  title: "producto prueba 3",
  description: "este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc125",
  stock: 25,
});
products.addProduct({
  title: "producto prueba 4",
  description: "este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc126",
  stock: 25,
});
products.addProduct({
  title: "producto prueba 5",
  description: "este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc127",
  stock: 25,
});

products.getProducts();
products.getProductsById(3);
products.getProductsById(5);
products.getProductsById(7);
