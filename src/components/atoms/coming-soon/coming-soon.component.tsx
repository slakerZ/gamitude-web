import React, { ReactElement } from "react";

import Typography from "@material-ui/core/Typography";

import useComingSoonStyles from "./styles";

const ComingSoon = (): ReactElement => {
    const classes = useComingSoonStyles();
    return (
        <div className={classes.container}>
            <div className={classes.banerText}>
                <Typography variant="h1" component="h1">
                    Coming soon
                </Typography>
                <Typography variant="h5" component="h5">
                    Going there, please be patient
                </Typography>
            </div>
        </div>
    );
};

export default ComingSoon;
