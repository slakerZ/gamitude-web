import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const PausedIconTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Paused Projects"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    'These are "I want to do it but I really have too much to do right now" projects, put all of your non priority projects here'
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default PausedIconTooltip;
