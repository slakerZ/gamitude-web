import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const ProfileIconTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Profile"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Time statistics for your work - charts, graphs and tables, manage personal information, logout"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default ProfileIconTooltip;
