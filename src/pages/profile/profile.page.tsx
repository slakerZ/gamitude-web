import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core";

const ProfilePage = () => {
    const useStyles = makeStyles({
        root: {
            padding: "50px",
        },
    });
    const classes = useStyles();

    return <div className={classes.root}></div>;
};

export default ProfilePage;
