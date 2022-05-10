const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const { response } = require("express");

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

    let SQL = "INSERT INTO services ( name, profession, city, city2, numberTel, description) VALUES (?,?,?,?,?,?)";

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

    SQL = `SELECT idservices , name, profession, city, numberTel, description FROM services WHERE LOCATE (?, name) > 0 OR LOCATE (?, profession) > 0 OR LOCATE (?, city) > 0 OR LOCATE (?, city2) > 0 `;

    dataBase.query(SQL, [information, information, information, information], (err, result) => {
        if (err) console.log(err);
        else response.send(result)
    });} else {response.send()}
});

app.listen(3001, () => {
    console.log("rodando server");
});