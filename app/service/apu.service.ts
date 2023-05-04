import axios from "axios";
import { Documento } from "../types/serviceDoc";

class Apu {

    rta: any;
    constructor(data: Documento[]) {
        this.rta = this.sendData(data);
    }
    sendData(data: Documento[]) {

        const rta = axios.post('http://cpe.apufact.com/portal/public/api/InsertDocumento', data)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });

        return rta;
    }

    getRta() {
        return this.rta;
    }
}

export { Apu }