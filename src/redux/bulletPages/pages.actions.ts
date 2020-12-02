import { PageType } from "api/bulletPages/types";

import { PagesActionTypes } from "./pages.types";

export const addPage = (value: PageType) => ({
    type: PagesActionTypes.ADD_PAGE,
    payload: value,
});

export const setPages = (value: any) => ({
    type: PagesActionTypes.SET_PAGES,
    payload: value,
});
