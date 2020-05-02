import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const RankNameTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Rank"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Unlock new ranks by boosting your strength, creativity, intelligence and fluency"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default RankNameTooltip;
