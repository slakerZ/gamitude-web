import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const StatsNavIconTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Stats and Energies"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Monitor your stats and energies here, remember boost your stats but don't forget to keep your energies high"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default StatsNavIconTooltip;
