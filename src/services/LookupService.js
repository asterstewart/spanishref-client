import axios from "axios"

const api = "https://api.sr.nathanstewart.me";

export default {
    async getVerbConjugation(verb) {
        let res = await axios.get(api + "/c/" + verb);
        return res.data;
    },
    async getLanguage(text) {
        let res = await axios.get(api + "/l/" + text);
        return res.data;
    },
    async translateText(code, text) {
        let res = await axios.get(api + "/t/" + code + "/" + text);
        return res.data;
    },
    async isValidVerb(text) {
        let res = await axios.get(api + "/v/" + text);
        return res.data === true;
    }
}
