import { Router } from "express";
import { usersModel } from "../models/users.models.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post(
  "/login",
  passport.authenticate("login"),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("/api/sessions/login", 400, {
          respuesta: "Invalid user",
        });
      }
      //si el usuario es valido, creo una sesión con todos los datos (menos contraseña)

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
      };

      res.redirect("/static", 200, {
        payload: req.user,
        respuesta: "Login ok",
      });
    } catch (error) {
      res.redirect("/api/sessions/login", 500, {
        error: `Login error: ${error}`,
      });
    }
  }
);

//hago el registro, si se puede registrar luego redirecciona a que se tenga que loguear. Solo se configura los status
sessionRouter.post(
  "/signup",
  passport.authenticate("signup"),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).send({ mensaje: "Existing user" });
      }

      res.status(200).send({ mensaje: "Registered user" });
    } catch (error) {
      res.status(500).send({ mensaje: `Error registering user ${error}` });
    }
  }
);

//registro mediante github
sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    res.status(200).send({ mensaje: "Registered user" });
  }
);

//iniciar sesion mediante github

sessionRouter.get(
  "/githubCallback",
  passport.authenticate("github"),
  async (req, res) => {
    req.session.user = req.user;
    res.status(200).send({ mensaje: "User logged in" });
  }
);

sessionRouter.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.redirect("/logout", 200, { respuesta: "Logged out user" });
});

export default sessionRouter;
