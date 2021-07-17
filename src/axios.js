import axios from "axios";

const customInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: { Accept: "application/json" },
});
export default customInstance;
