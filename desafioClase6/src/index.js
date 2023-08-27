import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import path from "path";
import prodsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import { Product, ProductManager } from "./productManager.js";

const PORT = 8080;
const app = express();
let products = new ProductManager("./data/products.json");

//Config

const serverExpress = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

//Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
app.use("/static", express.static(path.join(__dirname, "/public")));

//Server with express
const io = new Server(serverExpress);

io.on("connection", (socket) => {
  console.log("Servidor Socket.io conectado");

  // socket.on("getProds", async () => {
  //   let prods = await products.getProducts();
  //   console.log(prods);
  //   socket.emit("dataProds", prods);
  // });
});

let prods = [];
const getProds = async () => {
  try {
    prods = await products.getProducts();
  } catch (error) {
    console.error(error);
  }
};
getProds();

//Routes

app.get("/", (req, res) => {
  res.send("Bienvenido al desafio de la clase 6.");
});

app.use("/api/products", prodsRouter);
app.use("/api/carts", cartsRouter);

app.get("/static", (req, res) => {
  res.render("home", {
    css: "style.css",
    title: "Home",
    js: "home.js",
    listProds: prods,
  });
});
