const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const dataBase = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "senha",
    database: "crudservices",
});

app.use(cors());
app.use(express.json());

app.post("/registros" , (request, response) =>{
    const { name } = request.body;
    const { profession } = request.body;
    const { city } = request.body;
    const { city2 } = request.body;
    const { numberTel } = request.body;
    const { description } = request.body;

    let SQL = "INSERT INTO services ( name, profession, city, city2, numberTel, description) VALUES (?,?,?,?,?,?)";
    
    dataBase.query(SQL, [name, profession, city, city2, numberTel, description], (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    })
});

app.get("/getCards", (request, response) => {
    let SQL = "SELECT * FROM services";
    
    dataBase.query(SQL, (err, result) => {
        if (err) console.log(err);
        else response.send(result);
    });
});

app.post("/resultados", (request, result) => {
    
    const { information } = request.body;

    let SQL = `SELECT * FROM services WHERE name LIKE ?`;
    
    dataBase.query(SQL , [information], (err, result) => {
        if (err) console.log(err)
        else console.log(result);
    })
});


app.listen(3001, () => {
    console.log("rodando server");
});