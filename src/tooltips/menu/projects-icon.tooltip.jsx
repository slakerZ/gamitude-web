import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const ProjectsIconTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Projects"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Organize your working time into projects and complete them bit by bit with the working method that suits you"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default ProjectsIconTooltip;
