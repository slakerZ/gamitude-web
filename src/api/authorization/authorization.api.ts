import { DEV_ENDPOINT, PROD_ENDPOINT } from "api/constants";
import axios from "axios";
import { postLoginRequestBodyType } from "./types";

export const postLogin = async (
    postLoginRequestBody: postLoginRequestBodyType,
): Promise<any> => {
    const url =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/authorization/login`
            : `${PROD_ENDPOINT}/authorization/login`;

    const response = await axios.post(url, postLoginRequestBody);
    const result = await response.data;
    return result;
};
