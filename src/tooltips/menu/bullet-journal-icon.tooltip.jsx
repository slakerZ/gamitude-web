import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const BulletJournalIconTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Bullet Journal"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Want to break down your projects into milestones? Looking to add quick to-do? Trying to put a task in the time context? This is the place."
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default BulletJournalIconTooltip;
