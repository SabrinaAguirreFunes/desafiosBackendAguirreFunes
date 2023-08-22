import { promises as fs } from "fs";

export class Cart {
  constructor(newIdCart) {
    this.cartProducts = [];
    this.id = newIdCart;
  }

  addProduct(prodId) {
    const productIndex = this.cartProducts.findIndex(
      (each) => each.product === prodId
    );
    if (productIndex != -1) {
      this.cartProducts[productIndex].quantity += 1;
    } else {
      this.cartProducts.push({ product: prodId, quantity: 1 });
    }
  }
}

export class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async getCarts() {
    try {
      this.carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      console.log(this.carts);
      return this.carts;
    } catch (error) {
      console.error(error);
    }
  }

  async addCart() {
    try {
      await this.getCarts();

      let newIdCart = 0;

      if (this.carts.length > 0) {
        newIdCart = this.carts.length + 1;
      } else {
        newIdCart = 1;
      }

      const newCart = new Cart(newIdCart);

      this.carts.push(newCart);
      await fs.writeFile(this.path, JSON.stringify(this.carts));
      console.log("Cart added successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(idQuest) {
    try {
      this.carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      let cartQuest = this.carts.find((each) => each.id === idQuest);
      if (cartQuest) {
        console.log(cartQuest);
        return cartQuest;
      } else {
        console.error("Cart not found");
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async addProductToCart(cartId, prodId) {
    let cartData = await this.getCartById(cartId);
    if (!cartData) {
      console.error("Cart not found");
      return null;
    } else {
      const cart = Object.assign(new Cart(), cartData);
      cart.addProduct(prodId);
      await fs.writeFile(this.path, JSON.stringify(this.carts));
    }
  }
}
