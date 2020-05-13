import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const SelectDominantEnergyTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"... out of these 3 the body will benefit the most"}
            </Typography>
        </Fragment>
    );
};

export default SelectDominantEnergyTooltip;
