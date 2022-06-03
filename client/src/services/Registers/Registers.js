import Axios from "axios";
import { allActions } from "../../redux/actions";
import store from "../../redux/store/index";

var httpAgent = Axios.create({
    baseURL: "http://localhost:3001/",
  });

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