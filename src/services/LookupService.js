import axios from "axios"

const api = "https://api.sr.nathanstewart.me";

export default {
    async getVerbConjugation(verb) {
        const key = process.env.APIKEY;
        console.log(key);
        let res = await axios.post(api + "/c", {
            verb: verb,
            key: key
        });
        return res.data;
    },
    async getLanguage(text) {
        const key = process.env.APIKEY;
        let res = await axios.post(api + "/l", {
            text: text,
            key: key
        });
        return res.data;
    },
    async translateText(code, text) {
        const key = process.env.APIKEY;
        let res = await axios.post(api + "/t", {
            origin: code,
            text: text,
            key: key
        });
        return res.data;
    },
    async isValidVerb(text) {
        const key = process.env.APIKEY;
        let res = await axios.post(api + "/v", {
            verb: text,
            key: key
        });
        return res.data === true;
    }
}
