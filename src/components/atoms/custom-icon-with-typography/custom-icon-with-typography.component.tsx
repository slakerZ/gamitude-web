import React, { FC, ReactElement } from "react";

import Typography from "@material-ui/core/Typography";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";

import useCustomIconWithTypographyStyles from "./styles";
import { CustomIconWithTypographyType } from "./types";

const CustomIconWithTypography: FC<CustomIconWithTypographyType> = ({
    variant,
    children,
}: CustomIconWithTypographyType): ReactElement => {
    const classes = useCustomIconWithTypographyStyles();
    return (
        <div className={classes.root}>
            <CustomIcon variant={variant} size="small" />
            <Typography variant="h3" component="h3">
                {children}
            </Typography>
        </div>
    );
};

export default CustomIconWithTypography;
