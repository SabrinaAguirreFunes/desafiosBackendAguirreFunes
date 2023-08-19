import { Router } from "express";
import { Product, ProductManager } from "../productManager";

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
  const { code } = req.body;
  const newProduct = new Product(req.body);
  const product = await products.addProduct(newProduct);
  if (!product) {
    res
      .status(400)
      .send("Already existing product, please enter a new product.");
  } else {
    res.status(200).send("Product added successfully");
  }
});

prodsRouter.put("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const prod = await products.getProductsById(id);

  if (prod) {
    await products.updateProduct(id, req.body);
    res.status(200).send("Product updated seccessfully");
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
