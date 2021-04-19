import axios from "axios"

const api = process.env.APIURL;

export default {
    async getVerbConjugation(verb) {
        let res = await axios.get(api + "/c/" + verb);
        console.log('Reach');
        console.log(api);
        return res.data;
    },
    async getLanguage(text) {
        let res = await axios.get(api + "/l/" + text);
        console.log('Reach');
        console.log(api);
        return res.data;
    },
    async translateText(code, text) {
        let res = await axios.get(api + "/t/" + code + "/" + text);
        console.log('Reach');
        console.log(api);
        return res.data;
    },
    async isValidVerb(text) {
        let res = await axios.get(api + "/v/" + text);
        console.log('Reach');
        console.log(api);
        return res.data === true;
    }
}
