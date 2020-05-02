import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const EmotionsTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Emotions"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Meant to represent quality of your energy, whether your energy is being used up at steady pace or being wasted"
                }
                <br></br>
                <br></br>
                {"Build up through:"}
            </Typography>
            <ul>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {"pranayama practices and other breathing techniques"}
                    </Typography>
                </li>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {"appreciation"}
                    </Typography>
                </li>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {"changing perspective on everyday events"}
                    </Typography>
                </li>
            </ul>
        </Fragment>
    );
};

export default EmotionsTooltip;
