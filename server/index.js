const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const { response } = require("express");


const dataBase = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "aluno",
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
<<<<<<< HEAD
    if(information != null && information != " " && information != ""){
=======
    if(information != null && information != ""){
>>>>>>> 7d7a6d1a2e875e885e09b7662e93274d73d74857

    SQL = `SELECT idservices , name, profession, city, numberTel, description FROM services WHERE LOCATE (?, name) > 0 OR LOCATE (?, profession) > 0 OR LOCATE (?, city) > 0 OR LOCATE (?, city2) > 0 `;

    dataBase.query(SQL, [information, information, information, information], (err, result) => {
        if (err) console.log(err);
<<<<<<< HEAD
        else response.send(result)
=======
        else response.send(result), console.log(result);
        result = "";
        console.log(result);
>>>>>>> 7d7a6d1a2e875e885e09b7662e93274d73d74857
    });} else {response.send()}
});

app.listen(3001, () => {
    console.log("rodando server");
});