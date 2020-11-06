import axios from "axios";
import { API_ENDPOINT } from "api/constants";

export const getApiVersion = async (): Promise<string> => {
    const url = `${API_ENDPOINT}/version`;

    const response = await axios.get(url);
    const result = await response.data;
    return result;
};
