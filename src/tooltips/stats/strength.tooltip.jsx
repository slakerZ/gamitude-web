import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const StrengthTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Strength"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Stat meant to represent Bulkiness, Fitness and Endurance, use it for projects like 'Strength Training', 'HIIT' etc."
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default StrengthTooltip;
