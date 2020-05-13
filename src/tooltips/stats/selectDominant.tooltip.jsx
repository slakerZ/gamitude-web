import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const SelectDominantStatTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"... out of these 2 the fluency takes #1 spot"}
            </Typography>
        </Fragment>
    );
};

export default SelectDominantStatTooltip;
