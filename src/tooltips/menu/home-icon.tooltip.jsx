import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const HomeIconTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Home"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Not sure what it's all about? Want to learn more about science behind this site? Want to see who made the site? This is the place."
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default HomeIconTooltip;
