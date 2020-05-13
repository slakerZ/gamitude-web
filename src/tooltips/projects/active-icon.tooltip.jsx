import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const ActiveIconTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Active Projects"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "These are the projects that you're currently working on, try not have more than 7+-2 ogoing projects for best productivity"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default ActiveIconTooltip;
