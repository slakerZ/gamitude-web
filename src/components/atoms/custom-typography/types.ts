import { ReactNode } from "react";

export interface CustomTypographyType {
    children: ReactNode;
    variant?:
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "subtitle1"
        | "subtitle2"
        | "body1"
        | "body2"
        | undefined;
    component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | undefined;
    color?:
        | "inherit"
        | "initial"
        | "primary"
        | "secondary"
        | "textPrimary"
        | "textSecondary"
        | "error"
        | undefined;
}
