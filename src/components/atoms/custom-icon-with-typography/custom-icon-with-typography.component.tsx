import React, { Fragment, FC, ReactElement } from "react";
// Atoms
import CustomIcon from "../custom-icon/custom-icon.component";
import Typography from "@material-ui/core/Typography";
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
                <Typography variant="h3" component="h3">
                    {children}
                </Typography>
            </div>
        </Fragment>
    );
};

export default CustomIconWithTypography;
