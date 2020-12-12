import axios from "axios";

import { API_ENDPOINT } from "api/constants";

import { LoginRequestBodyType, LoginResponseBodyType } from "./types";

const ENDPOINT = `${API_ENDPOINT}/authorization`;

export const postLogin = async (
    postLoginRequestBody: LoginRequestBodyType,
): Promise<LoginResponseBodyType> => {
    const url = `${ENDPOINT}/login`;
    const response = await axios.post(url, postLoginRequestBody);
    const result = await response.data;

    return result;
};
