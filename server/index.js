const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const { reset } = require("nodemon");

const dataBase = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "senha",
    database: "crudservices",
});

app.use(cors());
app.use(express.json());

app.post("/registros", (request, response) => {
    const { name } = request.body;
    const { profession } = request.body;
    const { city } = request.body;
    const { city2 } = request.body;
    const { numberTel } = request.body;
    const { description } = request.body;

    let SQL = "INSERT INTO services (name, profession, city, city2, numberTel, description) VALUES (?,?,?,?,?,?)";

    dataBase.query(SQL, [name, profession, city, city2, numberTel, description], (err, result) => {
        if (err) console.log(err);
        else response.send(result);
    })
});

app.get("/getCards", (request, response) => {
    let SQL = "SELECT * FROM services";

    dataBase.query(SQL, (err, result) => {
        if (err) console.log(err);
        else response.send(result);
    });
});

app.post("/resultados", (request,response) => {
    const { information } = request.body;
    if(information != null && information != " " && information != ""){

    SQL = `SELECT idservice , name, profession, city, numberTel, description FROM services WHERE LOCATE (?, name) > 0 OR LOCATE (?, profession) > 0 OR LOCATE (?, city) > 0 OR LOCATE (?, city2) > 0 `;

    dataBase.query(SQL, [information, information, information, information], (err, result) => {
        if (err) console.log(err);
        else response.send(result);
    });} else {response.send("")}
});

app.post("/registrarAvaliacao", (request,response) => {
    const { idService } = request.body;
    const { username } = request.body;
    const { comment } = request.body;
    const { avaliation } = request.body;
    if(avaliation != 0){

    let SQL = "INSERT INTO avaliations (idService, username, comment, avaliation) VALUES (?, ?, ?, ?)"

    dataBase.query(SQL, [idService, username, comment, avaliation], (err, result) => {
        if (err) console.log(err);
        else response.send(result);
    });}else {response.send("")}
});

app.post("/getAvaliations", (request, response) => {
    const { idService } = request.body;

    let SQL = "SELECT idavaliation, username, comment, avaliation FROM avaliations WHERE ? = idservice"

    dataBase.query(SQL, [idService], (err, result) => {
        if (err) console.log(err);
        else response.send(result);
    })
})

app.listen(3001, () => {
    console.log("rodando server");
});