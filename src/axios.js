import axios from "axios";

const instanse = axios.create({
    baseURL: "http://localhost:3001",
});

instanse.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("token");
});

export default instanse;
