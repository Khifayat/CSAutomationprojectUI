import axios from "axios";

const backendUrl = process.env.REACT_APP_API_URL;

export default axios.create({
    baseURL: `http://localhost:8080/v1`
    //  baseURL: `${backendUrl}/v1`
});
