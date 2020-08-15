import React, { Fragment, ReactElement, FC } from "react";
import Typography from "@material-ui/core/Typography";
// Local
import { CustomTypographyType } from "./types";

const CustomTypography: FC<CustomTypographyType> = ({
    color = "textPrimary",
    variant = "h3",
    component = "h3",
    children,
}: CustomTypographyType): ReactElement => {
    return (
        <Fragment>
            <Typography variant={variant} component={component} color={color}>
                {children}
            </Typography>
        </Fragment>
    );
};

export default CustomTypography;
