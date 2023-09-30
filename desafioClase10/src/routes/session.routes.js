import { Router } from "express";
import { usersModel } from "../models/users.models.js";

const sessionRouter = Router();

sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (req.session.login) {
      res.redirect("/static", 200, { respuesta: "Existing login" });
    }
    const user = await usersModel.findOne({ email: email });

    if (user) {
      if (user.password == password) {
        req.session.login = true;
        req.session.email = email;
        res.redirect("/static", 200, { respuesta: "Login ok" });
      } else {
        req.session.error = "Invalid password";
        res.redirect("/api/sessions/login", 401, {
          respuesta: "Invalid password",
          message: password,
        });
      }
    } else {
      req.session.error = "Invalid user";
      res.redirect("/api/sessions/login", 404, {
        respuesta: "User not found",
        message: user,
      });
    }
  } catch (error) {
    req.session.error = "Login error";
    res.redirect("/api/sessions/login", 400, {
      error: `Login error: ${error}`,
    });
  }
});

sessionRouter.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.redirect("/api/sessions/login", 200, { respuesta: "Logged out user" });
});

export default sessionRouter;
