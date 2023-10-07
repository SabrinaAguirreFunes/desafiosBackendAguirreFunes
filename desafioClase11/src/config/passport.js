import local from "passport-local"; //Importo estrategia
import GithubStrategy from "passport-github2"; //Importo estrategia
import passport from "passport";
import { createHash, validatePassword } from "../utils/bcrypt.js";
import { usersModel } from "../models/users.models.js";

//Defino la estregia a utilizar
const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "signUp",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        //se define que siempre va a usar callbacks y con done se define que retorne como callback todo lo que genere

        //Registrar usuario

        const { first_name, last_name, email, age } = req.body;

        try {
          const user = await usersModel.findOne({ email: email });

          if (user) {
            return done(null, false);
          }

          //Crear usuario

          const passwordHash = createHash(password);
          const userCreated = await usersModel.create({
            first_name: first_name,
            last_name: last_name,
            age: age,
            email: email,
            password: passwordHash,
          });

          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        //validacion de usuario y contraseña en el mismo error para simplificar
        try {
          const user = await usersModel.findOne({ email: username });

          if (!user) {
            return done(null, false);
          }

          if (validatePassword(password, user.password)) {
            return done(null, user);
          }

          return done(null, false);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET_CLIENT,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        //pongo lo que voy a consultar de github
        try {
          console.log(accessToken);
          console.log(refreshToken);
          console.log(profile._json);
          const user = await usersModel.findOne({ email: profile._json.email }); //busco si existe el usuario
          if (user) {
            //si existe, no hacer nada
            done(null, false);
          } else {
            //si no existe, que cree el usuario
            const userCreated = await usersModel.create({
              first_name: profile._json.name,
              last_name: " ",
              email: profile._json.email,
              age: 18,
              password: createHash(profile._json.email + profile._json.name), //aprovecho los datos unicos para que cree la contraseña, encriptada, pero que sea con los valores unicos del usuario, para no crear una contraseña que sea identica para todos los usuarios
            });
            done(null, userCreated);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //Inicializar la session del user
  passport.serializeUser((user, done) => {
    done(null, user._id); //le digo por cual identificador unico debe buscar passport porque hay varios atributos que son validos (email, id, etc)
  });

  //Eliminar la session del user
  passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
