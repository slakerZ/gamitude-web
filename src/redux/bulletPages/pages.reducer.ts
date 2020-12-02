import { PagesActionTypes } from "./pages.types";

const INITIAL_STATE = {
    pages: [],
};

const pagesReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case PagesActionTypes.SET_PAGES:
            return {
                ...state,
                pages: action.payload,
            };
        case PagesActionTypes.ADD_PAGE:
            return {
                ...state,
                pages: [...state.pages, action.payload],
            };
        default:
            return state;
    }
};

export default pagesReducer;
