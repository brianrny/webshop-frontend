import axios from "axios";
import { environment } from "src/environments/environment";

export const api_config = axios.create({
    baseURL: environment.BASE_API_URL,
});