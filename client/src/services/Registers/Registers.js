import Axios from "axios";

var httpAgent = Axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
httpAgent.defaults.withCredentials = true;

export async function getUserName(userToken) {
  var userToken = await (await httpAgent.get("http://localhost:3001/getcookie")).data.token;
  if(userToken != undefined) {
    var username =
    await httpAgent.post("/getUserName", {
      userToken,
    });
    return username.data;
    
  } return undefined;
}

  export async function registerAvaliation(idService, userToken, comment, avaliation) {
        await httpAgent.post("http://localhost:3001/registrarAvaliacao", {
        idService,
        userToken,
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

   