import React, { Fragment } from "react";
// UI Core
import Typography from "@material-ui/core/Typography";

const ProjectNavIconTooltip = () => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {"Projects"}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {
                    "Work on your projects earning stats and unlocking new ranks, avoid burnout by monitoring your energies"
                }
                <br></br>
            </Typography>
        </Fragment>
    );
};

export default ProjectNavIconTooltip;
