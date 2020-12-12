import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

import { makeStyles } from "@material-ui/core";

import ComingSoon from "components/atoms/coming-soon/coming-soon.component";

const ProfilePage = () => {
    const useStyles = makeStyles({
        root: {
            padding: "50px",
        },
    });
    const classes = useStyles();

    return (
        <Fragment>
            <Helmet>
                <title>{"Gamitude | Settings"}</title>
            </Helmet>
            <ComingSoon />
        </Fragment>
    );
};

export default ProfilePage;
