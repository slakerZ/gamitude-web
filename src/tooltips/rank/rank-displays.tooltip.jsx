import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const RankNameTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Rank Requirements"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "These represent the requirements for unlocking this rank, you can think of them as rank's mana cost"
                }
                <br></br>
                {
                    "Two most dominant of these will be displayed in the background below and their colors will decide the card color"
                }
            </Typography>
        </Fragment>
    );
};

export default RankNameTooltip;
