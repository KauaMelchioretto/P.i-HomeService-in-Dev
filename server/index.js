const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const { reset } = require("nodemon");
const jwt = require("jsonwebtoken");
const SECRET = "password";

const dataBase = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "senha",
  database: "crudservices",
});

app.use(cors());
app.use(express.json());

function verifyJWT(request, response, next) {
  const token = request.headers["x-access-token"];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return response.status(401).end();
    request.iduser = decoded.iduser;
    next();
  });
}

// falta terminar
app.get("/verifyAccess", (request, response) => {
  const token = request.headers["x-access-token"];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return "";
    else request.iduser = decoded.iduser;
  });
});

app.post("/registros", (request, verifyJMT, response) => {
  const { iduser } = request.body;
  const { name } = request.body;
  const { profession } = request.body;
  const { city } = request.body;
  const { city2 } = request.body;
  const { numberTel } = request.body;
  const { description } = request.body;

  let SQL = `INSERT INTO services (iduser, name, profession, city, city2, numberTel, description) VALUES ( ?, ?, ?, ?, ?, ?, ?)`;

  dataBase.query(
    SQL,
    [iduser, name, profession, city, city2, numberTel, description],
    (err, result) => {
      if (err) console.log(err);
      else response.send(result);
    }
  );
});

app.post("/getCards", (request, response) => {
  const { iduser } = request.body;

  let SQL = "SELECT * FROM services WHERE ? = iduser";

  dataBase.query(SQL, [iduser], (err, result) => {
    if (err) console.log(err);
    else response.send(result);
  });
});

app.post("/resultados", (request, response) => {
  const { information } = request.body;
  if (information != null && information != " " && information != "") {
    SQL = `SELECT idservice , name, profession, city, numberTel, description FROM services WHERE LOCATE (?, name) > 0 OR LOCATE (?, profession) > 0 OR LOCATE (?, city) > 0 OR LOCATE (?, city2) > 0 `;

    dataBase.query(
      SQL,
      [information, information, information, information],
      (err, result) => {
        if (err) console.log(err);
        else response.send(result);
      }
    );
  } else {
    response.send("");
  }
});

app.post("/registrarAvaliacao", (request, response) => {
  const { idService } = request.body;
  const { username } = request.body;
  const { comment } = request.body;
  const { avaliation } = request.body;
  if (avaliation != 0) {
    let SQL =
      "INSERT INTO avaliations (idService, username, comment, avaliation) VALUES (?, ?, ?, ?)";

    dataBase.query(
      SQL,
      [idService, username, comment, avaliation],
      (err, result) => {
        if (err) console.log(err);
        else response.send(result);
      }
    );
  } else response.send("");
});

app.post("/getAvaliations", (request, response) => {
  const { idService } = request.body;

  let SQL =
    "SELECT idavaliation, username, comment, avaliation FROM avaliations WHERE ? = idservice";

  dataBase.query(SQL, [idService], (err, result) => {
    if (err) console.log(err);
    else response.send(result);
  });
});

app.post("/getEmailUsuario", (request, response) => {
  const { emailRegister } = request.body;

  let SQL = "SELECT email FROM users WHERE ? = email";
  dataBase.query(SQL, [emailRegister], (err, result) => {
    if (err) console.log(err);
    else response.send(result);
  });
});

app.post("/registroUsuario", (request, response) => {
  const { userName } = request.body;
  const { emailRegister } = request.body;
  const { passwordRegister } = request.body;

  let SQL = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  dataBase.query(
    SQL,
    [userName, emailRegister, passwordRegister],
    (err, result) => {
      if (err) console.log(err);
      else response.send(result);
    }
  );
});

//AJUSTAR A GERAÇÃO DE TOKEN CONFIRMANDO O RESULT
app.post("/login", (request, response) => {
  const { email } = request.body;
  const { password } = request.body;
  var token = {};

  let SQL = "SELECT iduser FROM users WHERE ? = email AND ? = password";
  dataBase.query(SQL, [email, password], (err, result) => {
    if (err) console.log(err);
    else if(result === {}) token = jwt.sign({ result }, SECRET, { expiresIn: "1h" });
    return response.send({ auth: true, token });
  });
});

app.listen(3001, () => {
  console.log("rodando server");
});
