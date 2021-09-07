
import { API_CEP } from "@/main.js"

class CadastroService {

    async pesquisaCep(cep) {
        return await fetch(API_CEP + `${cep}/json/`, {
            method: "GET",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json())
    }
}

export default new CadastroService();
