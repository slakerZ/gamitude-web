import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const BreakTimerTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Break Timer"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "After each completed session an adequate amount of time is going to appear here."
                }
                <br></br>
            </Typography>
            <ul>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {
                            "For Ultradian rhythm - after 90 minutes of work 30 minutes of break will be added"
                        }
                    </Typography>
                </li>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {
                            "For Pomodoro Technique - after first 4 session 5 minutes will be added after each 5th session 15 minutes will be added"
                        }
                    </Typography>
                </li>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {
                            "For other techniques - 1 minute of break for each 5 minutes of session"
                        }
                    </Typography>
                </li>
            </ul>
        </Fragment>
    );
};

export default BreakTimerTooltip;
