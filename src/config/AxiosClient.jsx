import axios from "axios";

const axiosClient = axios.create({
    baseURL:process.env.HTTP_API_POKEMON
});

export default axiosClient;