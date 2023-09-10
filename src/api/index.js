import axios from "axios";

export const url = "https://64d61d86754d3e0f13619fce.mockapi.io/";

class Actions {
    constructor() {

    }

    async get(url, data) {
        await axios.get(url).then(data);
    }

    async post(url, data) {
        await axios.post(url, data);
    }

    async put(url, data) {
        await axios.put(url, data);
    }

    async delete(url) {
        await axios.delete(url);
    }
}

export const Action = new Actions();