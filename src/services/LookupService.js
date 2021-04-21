import axios from "axios"
const api = "https://api.sr.nathanstewart.me";
export default {
    async getVerbConjugation(verb, token) {
        let res = await axios.post(api + "/c", {
            verb: verb},
            headers: {
                'Authorization': `Bearer ${token}`
            }
        );
        return res.data;
    },
    async getLanguage(text, token) {
        let res = await axios.post(api + "/l", {
            text: text},
            headers: {
                'Authorization': `Bearer ${token}`
            }
        );
        return res.data;
    },
    async translateText(code, text, token) {
        let res = await axios.post(api + "/t", {
            origin: code,
            text: text},
            headers: {
                'Authorization': `Bearer ${token}`
            }
        );
        return res.data;
    },
    async isValidVerb(text, token) {
        let res = await axios.post(api + "/v", {
            verb: text},
            headers: {
                'Authorization': `Bearer ${token}`
            }
        );
        return res.data === true;
    }
}
