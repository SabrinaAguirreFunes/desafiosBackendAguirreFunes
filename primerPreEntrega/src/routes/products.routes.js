import { Router } from "express";
import { Product, ProductManager } from "../productManager.js";

const prodsRouter = Router();
let products = new ProductManager("./data/products.json");

prodsRouter.get("/", async (req, res) => {
  const prods = await products.getProducts();

  const { limit } = req.query;

  if (limit) {
    const limitedProds = prods.slice(0, parseInt(limit));

    res.status(200).send(limitedProds);
  } else {
    res.status(200).send(prods);
  }
});

prodsRouter.get("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);

  const prod = await products.getProductsById(id);

  if (prod) {
    res.status(200).send(prod);
  } else {
    res.status(400).send("Product not found");
  }
});

prodsRouter.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  } = req.body;

  const newProduct = new Product(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  );

  const productId = await Product.createIdIncremental();
  newProduct.id = productId;

  const product = await products.addProduct(newProduct);

  if (!product) {
    res.status(200).send("Product added successfully");
  } else {
    res
      .status(400)
      .send("Already existing product, please enter a new product.");
  }
});

prodsRouter.put("/:pid", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  } = req.body;
  const data = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  };
  const id = parseInt(req.params.pid);
  const prod = await products.getProductsById(id);

  if (prod) {
    await products.updateProduct(id, data);
    res.status(200).send("Product updated successfully");
  } else {
    res.status(404).send("Product not found");
  }
});

prodsRouter.delete("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const prod = await products.getProductsById(id);

  if (prod) {
    await products.deleteProduct(id);
    res.status(200).send("Product removed seccessfully");
  } else {
    res.status(404).send("Product not found");
  }
});

export default prodsRouter;
