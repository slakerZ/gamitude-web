import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const SelectBoostedStatsTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {
                    "Certain forms of activities boost certain types of stats, for example learning a language would boost fluency and creativity ... "
                }
            </Typography>
        </Fragment>
    );
};

export default SelectBoostedStatsTooltip;
