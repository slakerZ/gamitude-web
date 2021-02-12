import axios from "axios";

import { VOICE_ENDPOINT } from "api/constants";

export const postPredict = async (requestBody: any): Promise<any> => {
    const url = `${VOICE_ENDPOINT}/predict`;

    const response = await axios.post(url, requestBody);
    const result = await response.data;
    return result;
};
