// export class ProductManager {
//   constructor() {
//     this.products = [];
//   }

//   addProduct({ title, description, price, thumbnail, code, stock }) {
//     let id = 0;
//     if (this.products.length === 0) {
//       id = 1;
//     } else {
//       let lastProduct = this.products[this.products.length - 1];
//       id = lastProduct.id + 1;
//     }

//     let product = { title, description, price, thumbnail, code, stock, id };

//     let codeCheck = this.products.find((each) => each.code === product.code);

//     if (codeCheck) {
//       console.error("Already existing product, please enter a new product.");
//     } else {
//       this.products.push(product);
//     }
//   }

//   getProducts() {
//     console.log(this.products);
//     return this.products;
//   }

//   getProductsById(idQuest) {
//     let productQuest = this.products.find((each) => each.id === idQuest);
//     if (productQuest) {
//       console.log(productQuest);
//       return productQuest;
//     }
//     console.error("Product not found");
//     return null;
//   }
// }
