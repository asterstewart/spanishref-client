import axios from "axios"

const api = "https://api.sr.nathanstewart.me";
const key = process.env.APIKEY;
export default {
    async getVerbConjugation(verb) {
        let res = await axios.post(api + "/c", {
            verb: verb,
            key: key
        });
        return res.data;
    },
    async getLanguage(text) {
        let res = await axios.post(api + "/l", {
            text: text,
            key: key
        });
        return res.data;
    },
    async translateText(code, text) {
        let res = await axios.post(api + "/t", {
            origin: code,
            text: text,
            key: key
        });
        return res.data;
    },
    async isValidVerb(text) {
        let res = await axios.post(api + "/v", {
            verb: text,
            key: key
        });
        return res.data === true;
    }
}
