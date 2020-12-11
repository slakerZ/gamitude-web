import React, { Fragment, ReactElement } from "react";
import ScrollableContainer from "react-full-page-scroll";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import useHomePageStyles from "./styles";

const time_passes = require("assets/videos/time_passes.mp4");
const energy = require("assets/videos/energy.mp4");

const GetStartedButton = () => {
    const classes = useHomePageStyles();

    return (
        <Button
            component={Link}
            to="/signInSignUp"
            variant="outlined"
            color="secondary"
            size="large"
            className={classes.button}
        >
            {"Get started!"}
        </Button>
    );
};

const HomePage = (): ReactElement => {
    const classes = useHomePageStyles();

    return (
        <Fragment>
            <div className={classes.fab}>
                <GetStartedButton />
            </div>
            <ScrollableContainer animationTime={1000}>
                <div className={classes.banner} aria-label="Slogan Banner">
                    <video autoPlay loop muted className={classes.video}>
                        <source src={energy} type="video/mp4" />
                    </video>
                    <div className={classes.centered}>
                        <div className={classes.flexColumn}>
                            <Typography component="h1" variant="h1">
                                {"Gamitude"}
                            </Typography>
                            <Typography
                                component="h2"
                                variant="h4"
                                className={classes.subTitle}
                            >
                                {"Manage your Energy not your Time"}
                            </Typography>
                            <GetStartedButton />
                        </div>
                    </div>
                </div>
                <div className={classes.banner}>
                    <video autoPlay loop muted className={classes.video}>
                        <source src={time_passes} type="video/mp4" />
                    </video>
                    <div className={classes.centered}>
                        <div className={classes.flexColumn}>
                            <Typography component="h1" variant="h1">
                                {"Gamitude"}
                            </Typography>
                            <Typography
                                component="h2"
                                variant="h4"
                                className={classes.subTitle}
                            >
                                {"Manage your Energy not your Time"}
                            </Typography>
                            <Button
                                component={Link}
                                to="/signInSignUp"
                                variant="outlined"
                                color="secondary"
                                size="large"
                                className={classes.button}
                            >
                                {"Get started!"}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes.banner}>
                    <img
                        className={classes.image}
                        src="https://images.unsplash.com/photo-1428973085873-61a784626aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80"
                    />
                    <div className={classes.centered}>
                        <div className={classes.flexColumn}>
                            <Typography component="h1" variant="h1">
                                {"Gamitude"}
                            </Typography>
                            <Typography
                                component="h2"
                                variant="h4"
                                className={classes.subTitle}
                            >
                                {"Manage your Energy not your Time"}
                            </Typography>
                            <Button
                                component={Link}
                                to="/signInSignUp"
                                variant="outlined"
                                color="secondary"
                                size="large"
                                className={classes.button}
                            >
                                {"Get started!"}
                            </Button>
                        </div>
                    </div>
                </div>
            </ScrollableContainer>
        </Fragment>
    );
};

export default HomePage;
