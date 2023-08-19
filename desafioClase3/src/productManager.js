import { promises as fs } from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(product) {
    try {
      this.products = JSON.parse(await fs.readFile(this.path, "utf-8"));

      let codeCheck = this.products.find((each) => each.code === product.code);

      if (codeCheck) {
        console.error("Already existing product, please enter a new product.");
      } else {
        this.products.push(product);
        await fs.writeFile(this.path, JSON.stringify(this.products));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      this.products = JSON.parse(await fs.readFile(this.path, "utf-8"));
      console.log(this.products);
      return this.products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsById(idQuest) {
    try {
      this.products = JSON.parse(await fs.readFile(this.path, "utf-8"));
      let productQuest = this.products.find((each) => each.id === idQuest);
      if (productQuest) {
        console.log(productQuest);
        return productQuest;
      }
      console.error("Product not found");
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(idQuest, data) {
    try {
      this.products = JSON.parse(await fs.readFile(this.path, "utf-8"));

      let productIndex = this.products.findIndex((each) => each.id === idQuest);

      if (productIndex != -1) {
        this.products[productIndex].title = data.title;
        this.products[productIndex].description = data.description;
        this.products[productIndex].price = data.price;
        this.products[productIndex].thumbnail = data.thumbnail;
        this.products[productIndex].code = data.code;
        this.products[productIndex].stock = data.stock;
        await fs.writeFile(this.path, JSON.stringify(this.products));
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(idQuest) {
    try {
      this.products = JSON.parse(await fs.readFile(this.path, "utf-8"));
      let productToDelete = this.products.find((each) => each.id === idQuest);
      if (productToDelete) {
        await fs.writeFile(
          this.path,
          JSON.stringify(this.products.filter((each) => each.id != idQuest))
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.createIdIncremental();
  }

  static createIdIncremental() {
    if (this.idIncremental) {
      this.idIncremental++;
    } else {
      this.idIncremental = 1;
    }
    return this.idIncremental;
  }
}
