import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const BodyTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Body"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Energy meant to represent your physical wellness, whether body is tense or relaxed, whether the body feels light or heavy"
                }
                <br></br>
                <br></br>
                {"Build up through:"}
            </Typography>
            <ul>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {"adequate nutrition"}
                    </Typography>
                </li>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {"sleeping well"}
                    </Typography>
                </li>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {
                            " stretching, yoga and other light physical activities"
                        }
                    </Typography>
                </li>
            </ul>
        </Fragment>
    );
};

export default BodyTooltip;
