import express from "express";
import prodsRouter from "./routes/products.routes.js";
import { __dirname } from "./path.js";
import path from "path";

const PORT = 8080;
const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenido a la primer Pre-Entrega.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", prodsRouter);
app.use("/static", express.static(path.join(__dirname, "/public")));

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
