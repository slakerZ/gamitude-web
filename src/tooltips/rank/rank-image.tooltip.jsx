import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const RankImageTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Rank Image"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "This is the visual representation of your productivity spirit animal"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default RankImageTooltip;
