import axios from "axios";
const instance = axios.create({
    baseURL: 'https://lab2-emt-196009.herokuapp.com/',
    headers: {
        'Access-Control-Allow-Origin' : '*',
    }
})

export default instance;
