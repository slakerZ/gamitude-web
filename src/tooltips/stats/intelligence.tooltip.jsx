import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const IntelligenceTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Intelligence"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Stat meant to represent proficiency in Math, Informatics and Science"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default IntelligenceTooltip;
