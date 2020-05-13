import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const RankNavIconTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Rank"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {"Visual representation of your productivity"}
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default RankNavIconTooltip;
