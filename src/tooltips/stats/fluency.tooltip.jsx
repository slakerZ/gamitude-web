import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const FluencyTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Fluency"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Stat meant to represent proficiency in Humanities, Linguistics and Economics"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default FluencyTooltip;
