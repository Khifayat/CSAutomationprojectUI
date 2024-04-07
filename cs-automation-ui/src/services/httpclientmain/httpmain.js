import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default axios.create({
    baseURL: `${backendUrl}/v1`
});
