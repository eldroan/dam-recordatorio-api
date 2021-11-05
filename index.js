import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { login } from "./services/sysacad-client.js";
import { Base64 } from "js-base64";
import pkg from "./models/index.cjs";
import rec from "./models/recordatorios.cjs";
const { recordatorios } = pkg;

const app = express();

// Agregamos un 'middleware' para parsear json en todas las rutas.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cors
app.use(cors());
// Logs
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send("Acá no hay nada! proba con las otras rutas");
});

// interceptor de sysacad
const sysacadLogin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).send({
      message:
        "No se recibio un token en la respuesta o el mismo no empezaba con 'Basic '.",
    });
  } else {
    try {
      const sysacadResponse = await login(authHeader);
      if (!sysacadResponse.token || !sysacadResponse.alumno) {
        throw sysacadResponse; // hubo un error
      }
      req.body.alumno = sysacadResponse.alumno;
      req.body.legajo = Base64.decode(authHeader.replace("Basic ", "")).split(
        ":"
      )[0];
      next();
    } catch (err) {
      return res.status(401).send({
        message: "Fallo la autenticacion",
        inner: JSON.stringify(err),
      });
    }
  }
};
app.use(sysacadLogin);

app.post("/recordatorio", (req, res) => {
  try {
    const legajo = req.body.legajo;
    const mensaje = req.body.mensaje;
    const fecha = new Date(req.body.fecha);
    return recordatorios
      .create({
        mensaje,
        legajo,
        fecha,
      })
      .then((r) => res.status(200).send(r))
      .catch((error) => res.status(400).send(error));
  } catch (err) {
    return res.status(500).send({
      message: "Fallo el guardado",
      inner: JSON.stringify(err),
    });
  }
});

app.get("/recordatorio", (req, res) => {
  try {
    const legajo = req.body.legajo;
    return recordatorios
      .findAll({
        where: {
          legajo,
        },
      })
      .then((r) => res.status(200).send(r))
      .catch((error) => res.status(400).send(error));
  } catch (err) {
    return res.status(500).send({
      message: "Fallo la recuperacion",
      inner: err,
    });
  }
});

app.delete("/recordatorio", (req, res) => {
  try {
    const legajo = req.body.legajo;
    const id = req.body.id;
    return recordatorios
      .destroy({
        where: {
          legajo,
          id,
        },
      })
      .then((r) => res.status(200).send(r))
      .catch((error) => res.status(400).send(error));
  } catch (err) {
    return res.status(500).send({
      message: "Fallo la recuperacion",
      inner: JSON.stringify(err),
    });
  }
});

const port = parseInt(process.env.PORT, 10) || 1337;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
