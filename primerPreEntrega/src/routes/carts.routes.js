import { Router } from "express";
import { CartManager } from "../cartManager.js";

const cartsRouter = Router();
const carts = new CartManager("./data/carts.json");

cartsRouter.post("/", async (req, res) => {
  const cart = await carts.addCart();

  if (cart) {
    res.status(200).send(cart);
  } else {
    res.status(400).send("Error creating cart");
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  const id = parseInt(req.params.cid);
  const cart = await carts.getCartById(id);

  if (cart) {
    res.status(200).send(cart);
  } else {
    res.status(400).send("Cart not found");
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const cart = await carts.getCartById(cid);

  if (cart) {
    await carts.addProductToCart(cid, pid);
    res.status(200).send("Product added to cart successfully");
  } else {
    res.status(400).send("Error adding product");
  }
});

export default cartsRouter;
