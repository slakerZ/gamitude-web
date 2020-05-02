import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const SoulTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Soul - Human Spirit"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Energy meant to represent your sense of meaning and purpose, whether you have the deep sense of meaning inside"
                }
                <br></br>
                <br></br>
                {"Build up through:"}
            </Typography>
            <ul>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {"doing what you do best and enjoy most at work"}
                    </Typography>
                </li>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {
                            "consciously allocating time and energy to the areas that mean a lot to you - family, work etc."
                        }
                    </Typography>
                </li>
                <li>
                    <Typography component="p" variant="body1" align="center">
                        {"living your core values in your daily behaviors"}
                    </Typography>
                </li>
            </ul>
        </Fragment>
    );
};

export default SoulTooltip;
