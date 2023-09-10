import { Router } from "express";
import { productsModel } from "../models/products.models.js";

const prodsRouter = Router();

prodsRouter.get("/", async (req, res) => {
  const { limit } = req.query;

  try {
    const prods = await productsModel.find().limit(limit);
    res.status(200).send({ respuesta: "OK", mensaje: prods });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error consulting products", mensaje: error });
  }
});

prodsRouter.get("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const prod = await productsModel.findById(id);
    if (prod) res.status(200).send({ respuesta: "OK", mensaje: prod });
    else
      res.status(404).send({
        respuesta: "Error consulting product",
        mensaje: "Product not found",
      });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error consulting product", mensaje: error });
  }
});

prodsRouter.post("/", async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  try {
    const prod = await productsModel.create({
      title,
      description,
      code,
      price,
      stock,
      category,
    });
    res.status(200).send({ respuesta: "OK", mensaje: prod });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error creating product", mensaje: error });
  }
});

prodsRouter.put("/:pid", async (req, res) => {
  const id = req.params.pid;
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

  try {
    const prod = await productsModel.findByIdAndUpdate(id, {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    });
    if (prod) {
      res
        .status(200)
        .send({ respuesta: "OK", mensaje: "Product updated successfully" });
    } else {
      res.status(404).send({
        respuesta: "Error updating product",
        mensaje: "Product not found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error updating product", mensaje: error });
  }
});

prodsRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const prod = await productsModel.findByIdAndDelete(id);
    if (prod)
      res
        .status(200)
        .send({ respuesta: "OK", mensaje: "Product removed seccessfully" });
    else
      res.status(404).send({
        respuesta: "Error removing product",
        mensaje: "Product not found",
      });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error removing product", mensaje: error });
  }
});

export default prodsRouter;
