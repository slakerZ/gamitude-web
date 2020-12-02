import { TypographyProps } from "@material-ui/core";

export interface CustomIconWithTypographyType extends TypographyProps {
    children: string;
    iconVariant: string;
    iconSize?: string;
}
