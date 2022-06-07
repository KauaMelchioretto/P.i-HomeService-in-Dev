import Axios from "axios";

var httpAgent = Axios.create({
    baseURL:"http://localhost:3001",
});

export async function editService(id, name, profession, city, city2, numberTel, description) {
    const result =
    await httpAgent.put("http://localhost:3001/editService", {
        id,
        name,
        profession,
        city,
        city2,
        numberTel,
        description,
    }); return result;
}