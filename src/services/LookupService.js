import axios from "axios"
const api = "https://api.sr.nathanstewart.me";
export default {
    async getVerbConjugation(verb) {
        let res = await axios.post(api + "/c", {
            verb: verb
        });
        return res.data;
    },
    async getLanguage(text) {
        let res = await axios.post(api + "/l", {
            text: text
        });
        return res.data;
    },
    async translateText(code, text) {
        let res = await axios.post(api + "/t", {
            origin: code,
            text: text
        });
        return res.data;
    },
    async isValidVerb(text) {
        let res = await axios.post(api + "/v", {
            verb: text
        });
        return res.data === true;
    }
}
