import React, { FC, ReactElement } from "react";

import Typography from "@material-ui/core/Typography";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";

import useCustomIconWithTypographyStyles from "./styles";
import { CustomIconWithTypographyType } from "./types";

const CustomIconWithTypography: FC<CustomIconWithTypographyType> = ({
    iconVariant,
    iconSize = "small",
    children,
    variant = "h3",
}: CustomIconWithTypographyType): ReactElement => {
    const classes = useCustomIconWithTypographyStyles();
    return (
        <div className={classes.root}>
            <CustomIcon variant={iconVariant} size={iconSize} />
            <Typography variant={variant} component={"h3"}>
                {children}
            </Typography>
        </div>
    );
};

export default CustomIconWithTypography;
