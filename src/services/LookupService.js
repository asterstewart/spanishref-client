import axios from "axios"
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const secretClient = new SecretManagerServiceClient();
const [version] = secretClient.accessSecretVersion({
    name: 'projects/674145050597/secrets/spanishreference_api_key/versions/1'
});
const key = version.payload.data.toString();

const api = "https://api.sr.nathanstewart.me";
export default {
    async getVerbConjugation(verb) {
        console.log(key);
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
