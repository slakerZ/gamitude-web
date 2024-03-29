export interface ThemesPagePropTypes {
    token: string;
    setSnackbarState: any;
    setUser: any;
    user: boolean | null;
}
export interface FilterType {
    s: boolean;
    a: boolean;
    b: boolean;
    c: boolean;
    d: boolean;
    e: boolean;
    f: boolean;
    str: boolean;
    crt: boolean;
    int: boolean;
    flc: boolean;
    cash: boolean;
}

export interface ActionType {
    type: string;
    payload: boolean;
}
