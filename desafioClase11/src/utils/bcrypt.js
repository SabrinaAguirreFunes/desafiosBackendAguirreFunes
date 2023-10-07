import bcrypt from "bcrypt";

//para encriptar la informacion a guardar en la BDD
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)));

//para que el usuario se pueda loguear (ya que no conoce como queda la contraseña encriptada)
export const validatePassword = (passwordSend, passwordBDD) =>
  bcrypt.compareSync(passwordSend, passwordBDD);
