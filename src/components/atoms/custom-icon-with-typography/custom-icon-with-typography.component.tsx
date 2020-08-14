import React, { Fragment, FC, ReactElement } from "react";
// Atoms
import CustomIcon from "../custom-icon/custom-icon.component";
import Typography from "@material-ui/core/Typography";
// Local
import { CustomIconWithTypographyType } from "./types";

const CustomIconWithTypography: FC<CustomIconWithTypographyType> = ({
    variant,
    children,
}: CustomIconWithTypographyType): ReactElement => {
    return (
        <Fragment>
            <CustomIcon variant={variant} size="small" />
            <Typography variant="h3" component="h3">
                {children}
            </Typography>
        </Fragment>
    );
};

export default CustomIconWithTypography;
