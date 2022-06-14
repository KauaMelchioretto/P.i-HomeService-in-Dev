const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const SECRET = "password";

const dataBase = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "bf11e650684986",
  password: "ea084074",
  database: "heroku_3bb06900a2cf28a",
});

app.use(cors({ credentials:true , origin: "http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser()); 

function verifyJWT(request, response) {
  const token = jwt.decode(request);
  const idUser = parseInt(token.result.map((value) => value.iduser));
  if (idUser != undefined) return idUser;
  else return response.status(401).end();
}


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

function getUserNameJWT(request,response) {
  const token = jwt.decode(request);
  var username = JSON.stringify(token.result.map((value) => value.username));
  username = username.replace(/[[\]\\"]/g, ''); 
  if(username != undefined) return username;
  else return response.status(401).end();
}

app.post("/getUserName", (request, response) => {
  const { userToken } = request.body;
  const username = getUserNameJWT(userToken);
  response.send(username);
});

app.post("/registrarAvaliacao", (request, response) => {
  const { idService } = request.body;
  const { userToken } = request.body;
  const username = getUserNameJWT(userToken);
  const { comment } = request.body;
  const { avaliation } = request.body;

  let SQL =
    "INSERT INTO avaliations (idservice, username, comment, avaliation) VALUES (?, ?, ?, ?)";

  dataBase.query(
    SQL,
    [idService, username, comment, avaliation],
    (err, result) => {
      if (err) console.log(err);
      else response.send(result);
    }
  );
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
  const { email } = request.body;

  let SQL = "SELECT email FROM users WHERE ? = email";
  dataBase.query(SQL, [email], (err, result) => {
    if (err) console.log(err);
    else response.send(result);
  });
});

app.post("/registroUsuario", (request, response) => {
  const { userName } = request.body;
  const { email } = request.body;
  const { password } = request.body;

  let SQL = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  dataBase.query(SQL, [userName, email, password], (err, result) => {
    if (err) console.log(err);
    else response.send(result);
  });
});

app.post("/login", (request, response) => {
  const { email } = request.body;
  const { password } = request.body;
  let token;

  let SQL = "SELECT iduser, username FROM users WHERE ? = email AND ? = password";
  dataBase.query(SQL, [email, password], (err, result) => {
    if (err) console.log(err);
    else {
      if (result.length !== 0) {
        token = jwt.sign({ result }, SECRET, { expiresIn: "1h" });
        response.cookie("token", token, {
          expires: new Date(Date.now() + 1200000),
          httpOnly: false,
        });
        response.json({ auth: true, token, result });
      } else response.send(null);
    }
  });
});

app.get("/getcookie", function (request, response){
  response.send(request.cookies);
});

app.get('/clearcookie', function(req, res) {
  cookie = req.cookies;
  for (var prop in cookie) {
      if (!cookie.hasOwnProperty(prop)) {
          continue;
      }    
      res.cookie(prop, 'token', {expires: new Date(0)});
  }
  res.send();
});

app.put("/editService", (request, response) => {
  const { id } = request.body;
  const { name } = request.body;
  const { profession } = request.body;
  const city = request.body.city;
  const city2 = request.body.city2;
  const numberTel = request.body.numberTel;
  const description = request.body.description;

  let SQL =
    "UPDATE services SET name = ?, profession = ?, city = ?, city2 = ?, numberTel = ?, description = ?WHERE idservice = ?";

  dataBase.query(
    SQL,
    [name, profession, city, city2, numberTel, description, id],
    (err, result) => {
      if (err) console.log(err);
      else response.send(result);
    }
  );
});

app.delete("/deleteAvaliation/:id", (request, response) => {
  const { id } = request.params.id;

  let SQL = "DELETE FROM avaliations WHERE idservice = ?";
  dataBase.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else response.send(result);
  });
});

app.delete("/deleteService/:id", (request, response) => {
  const { id } = request.params;

  let SQL = "DELETE FROM services WHERE idservice = ?";
  dataBase.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else response.send(result);
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("rodando server");
});

if(process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
}