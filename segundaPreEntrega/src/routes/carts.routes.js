import { Router } from "express";
import { cartsModel } from "../models/carts.models.js";
import { productsModel } from "../models/products.models.js";

const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = await cartsModel.create({});
    res.status(200).send({ respuesta: "OK", mensaje: cart });
  } catch (error) {
    res.status(400).send({ respuesta: "Error creating cart", mensaje: error });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  const id = req.params.cid;

  try {
    const cart = await cartsModel.findById(id);
    if (cart) res.status(200).send({ respuesta: "OK", mensaje: cart });
    else
      res.status(404).send({
        respuesta: "Error consulting cart",
        mensaje: "Cart not found",
      });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error consulting cart", mensaje: error });
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const { quantity } = req.body;

  try {
    const cart = await cartsModel.findById(cid);
    if (cart) {
      const prod = await productsModel.findById(pid);

      if (prod) {
        const indice = cart.products.findIndex((item) => item.id_prod == pid);
        if (indice != -1) {
          cart.products[indice].quantity = quantity;
        } else {
          cart.products.push({ id_prod: pid, quantity: quantity });
        }
        const respuesta = await cartsModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: "OK", mensaje: respuesta });
      } else {
        res.status(404).send({
          respuesta: "Error adding product to cart",
          mensaje: "Product not found",
        });
      }
    } else {
      res.status(404).send({
        respuesta: "Error adding product to cart",
        mensaje: "Cart not found",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ respuesta: "Error adding product to cart", mensaje: error });
  }
});

export default cartsRouter;
