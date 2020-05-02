import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const RankTierTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Rank Tier"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Each rank belongs to a tier which represents its place on the foodchain, think of tiers as of milestones on the road to productivity"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default RankTierTooltip;
