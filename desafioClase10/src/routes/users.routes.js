import { Router } from "express";
import { usersModel } from "../models/users.models.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await usersModel.find();
    res.status(200).send({ respuesta: "OK", mensaje: users });
  } catch (error) {
    res.status(400).send({ respuesta: "Error querying users", mensaje: error });
  }
});

usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersModel.findById(id);
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({
        respuesta: "Error querying user",
        mensaje: "User not Found",
      });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error querying user", mensaje: error });
  }
});

usersRouter.post("/", async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;
  try {
    const respuesta = await usersModel.create({
      first_name,
      last_name,
      age,
      email,
      password,
    });
    res.redirect("/api/sessions/login", 200, {
      respuesta: "OK",
      mensaje: respuesta,
    });
  } catch (error) {
    res.status(400).send({ respuesta: "Error creating user", mensaje: error });
  }
});

usersRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age, email, password } = req.body;
  try {
    const user = await usersModel.findByIdAndUpdate(id, {
      first_name,
      last_name,
      age,
      email,
      password,
    });
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({
        respuesta: "Error updating user",
        mensaje: "User not Found",
      });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error updating user", mensaje: error });
  }
});

usersRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersModel.findByIdAndDelete(id);
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({
        respuesta: "Error deleting user",
        mensaje: "User not Found",
      });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error deleting user", mensaje: error });
  }
});

export default usersRouter;
