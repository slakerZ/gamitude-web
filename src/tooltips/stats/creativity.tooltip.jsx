import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const CreativityTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Creativity"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Stat meant to represent proficiency in Arts, Crafts and other forms of creative work, like writing a book"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default CreativityTooltip;
