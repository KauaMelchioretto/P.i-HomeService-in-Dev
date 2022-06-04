import Axios from "axios";

var httpAgent = Axios.create({
    baseURL: "http://localhost:3001/",
  });

  export async function getUserName(userToken) {
    if(userToken != undefined) {
      await httpAgent.post("http://localhost:3001/getUserName", {
        userToken,
      }).then((response) => {
        const data = response.data;
        const username = data.map((value) => value.username);
        const l = parseInt(username);
        console.log(l);
      return response;
    });
    } else return false;
  }

  export async function registerAvaliation(idService, userName, comment, avaliation) {
      await httpAgent.post("http://localhost:3001/registrarAvaliacao", {
        userName,
        idService,
        comment,
        avaliation,
      }); window.alert("Avaliação registrada com sucesso!");
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
      await httpAgent.post("http://localhost:3001/getEmailUsuario", {
        email,
      }).then((response) => {
        if (response != "~(~)") 
          return true;
        else
        return false;
      });  
    }

    export async function registerUser(userName, email, password) {
      await httpAgent.post("http://localhost:3001/registroUsuario", {
        userName,
        email,
        password,
      }); window.alert("Cadastrado com sucesso!");
    }

   