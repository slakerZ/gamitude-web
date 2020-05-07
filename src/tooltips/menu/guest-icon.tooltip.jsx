import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const GuestIconTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Guest"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {"Register then login in order to access this site's features"}
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default GuestIconTooltip;
