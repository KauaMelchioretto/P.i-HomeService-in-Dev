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

app.listen(3001, () => {
    console.log("rodando server");
});