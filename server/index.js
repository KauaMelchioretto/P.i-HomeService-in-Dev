const express = require("express");
const app = express();

app.get("/", (request, result) => {
    result.send("Hello worlasdasd");
}); 

app.listen(3001, () => {
    console.log("rodando server");
});