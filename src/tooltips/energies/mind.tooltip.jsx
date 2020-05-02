import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const MindTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Mind"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Energy meant to represent your cognitive readiness, whether you're focused and efficient or distracted and drained"
                }
                <br></br>
                <br></br>
                {"Build up through:"}
            </Typography>
            <ul>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {" meditation"}
                    </Typography>
                </li>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {"breaking work time into sessions"}
                    </Typography>
                </li>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {
                            "focusing on activities that have the most long-term leverage"
                        }
                    </Typography>
                </li>
            </ul>
        </Fragment>
    );
};

export default MindTooltip;
