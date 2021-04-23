import axios from "axios"
const api = "https://api.sr.nathanstewart.me";

export default {
    async getVerbConjugation(verb, token) {
        let config = {
            method: 'post',
            url: api + "/c",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: { 'verb': verb }
        }
        console.log(config);
        let res = await axios(config);
        return res.data;
    },
    async getLanguage(text, token) {
        let config = {
            method: 'post',
            url: api + "/l",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: { 'text': text }
        }
        let res = await axios(config);
        return res.data;
    },
    async translateText(code, text, token) {
        let config = {
            method: 'post',
            url: api + "/t",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: { 'origin': code, 'text': text }
        }
        let res = await axios(config);
        return res.data;
    },
    async isValidVerb(text, token) {
        let config = {
            method: 'post',
            url: api + "/v",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: { 'verb': text }
        }
        let res = await axios(config);
        return res.data === true;
    }
}
