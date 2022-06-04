const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const { reset } = require("nodemon");
const jwt = require("jsonwebtoken");
const { request } = require("express");
const SECRET = "password";

const dataBase = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "senha",
  database: "crudservices",
});

app.use(cors());
app.use(express.json());

function verifyJWT(request, response) {
  const token = jwt.decode(request);
  const idUser = parseInt(token.result.map((value) => value.iduser));
  if(idUser != undefined)
  return idUser;

  return response.status(401).end();
  };


app.post("/registrosDeServicos", (request, response) => {
  const { userToken } = request.body;
  const iduser = verifyJWT(userToken);
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
  const { userToken } = request.body;
  const iduser = verifyJWT(userToken);

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
  const { userName } = request.body;
  const { comment } = request.body;
  const { avaliation } = request.body;
  if (avaliation != 0) {
    let SQL = "INSERT INTO avaliations (idservice, username, comment, avaliation) VALUES (?, ?, ?, ?)";

    dataBase.query(
      SQL,
      [idService, userName, comment, avaliation],
      (err, result) => {
        if (err) console.log(err);
        else response.send(result);
      }
    );
  } else response.send("");
});

app.post("/getUserName" , (request, response) => {
  const { userToken } = request.body;
  const idUser = verifyJWT(userToken);

  let SQL = "SELECT username FROM users WHERE ? = iduser";

  dataBase.query(SQL, [idUser], (err, result) => {
    if(err) console.log(err);
    else response.send(result);
  })
})

app.post("/getAvaliations", (request, response) => {
  const { idService } = request.body;

  let SQL = "SELECT idavaliation, username, comment, avaliation FROM avaliations WHERE ? = idservice";

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
  const { email } = request.body;
  const { password } = request.body;

  let SQL = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  dataBase.query(
    SQL,
    [userName, email, password],
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

  let SQL = "SELECT iduser FROM users WHERE ? = email AND ? = password";
  dataBase.query(SQL, [email, password], (err, result) => {
    if (err) console.log(err);
    else token = jwt.sign({ result }, SECRET, { expiresIn: "1h" });
    if(result.length !== 0) response.send({ auth: true, token, result });
    else response.send("");
  });
});




app.listen(3001, () => {
  console.log("rodando server");
});
