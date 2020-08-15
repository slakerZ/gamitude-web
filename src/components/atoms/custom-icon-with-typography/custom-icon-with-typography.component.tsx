import React, { Fragment, FC, ReactElement } from "react";
// Atoms
import CustomIcon from "../custom-icon/custom-icon.component";
import CustomTypography from "../custom-typography/custom-typography.component";
// Local
import { CustomIconWithTypographyType } from "./types";
import useCustomIconWithTypographyStyles from "./styles";

const CustomIconWithTypography: FC<CustomIconWithTypographyType> = ({
    variant,
    children,
}: CustomIconWithTypographyType): ReactElement => {
    const classes = useCustomIconWithTypographyStyles();
    return (
        <Fragment>
            <div className={classes.root}>
                <CustomIcon variant={variant} size="small" />
                <CustomTypography>{children}</CustomTypography>
            </div>
        </Fragment>
    );
};

export default CustomIconWithTypography;
