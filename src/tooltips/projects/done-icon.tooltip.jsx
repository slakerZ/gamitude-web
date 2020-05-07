import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const DoneIconTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Done Projects"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "This is your archive, your hall of glory, behold and relish how much you've accomplished"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default DoneIconTooltip;
