import Axios from "axios";

var httpAgent = Axios.create({
    baseURL: "http://localhost:3001/",
  });

  export async function getUserName(userToken) {
    if(userToken != "") {
      var result =
      await httpAgent.post("http://localhost:3001/getUserName", {
        userToken,
      });
      result = result.data.map((value) => value.username);
      var username = JSON.stringify(result);
      username = username.replace(/[[\]\\"]/g, ''); //
      return username;
      
    } return undefined;
  }

  export async function registerAvaliation(idService, username, comment, avaliation) {
        await httpAgent.post("http://localhost:3001/registrarAvaliacao", {
        idService,
        username,
        comment,
        avaliation,
      });
    }

   export async function registerService(userToken, name, profession, city, city2,numberTel, description) {
        await httpAgent.post("http://localhost:3001/registrosDeServicos", {
          userToken,
          name,
          profession,
          city,
          city2,
          numberTel,
          description,
        });
      }

    export async function verifyUserEmail(email) {
      const verify =
      await httpAgent.post("http://localhost:3001/getEmailUsuario", {
        email,
      });
        if (verify.data.length === 0) {
           return true;
        }
         else
           return false;
    }

    export async function registerUser(userName, email, password) {
      await httpAgent.post("http://localhost:3001/registroUsuario", {
        userName,
        email,
        password,
      }); window.alert("Cadastrado com sucesso!");
    }

   