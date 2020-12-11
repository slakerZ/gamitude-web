import React, { Fragment, ReactElement } from "react";
import ScrollableContainer from "react-full-page-scroll";
import { Link } from "react-router-dom";
import {
    ParallaxProvider,
    ParallaxBanner,
    Parallax,
} from "react-scroll-parallax";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import useHomePageStyles from "./styles";

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
        <ParallaxProvider>
            <div className={classes.fab}>
                <GetStartedButton />
            </div>
            <ScrollableContainer animationTime={1000}>
                <Parallax className={classes.banner}>
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
                            <GetStartedButton />
                        </div>
                    </div>
                </Parallax>
                <Parallax className={classes.banner}>
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
                </Parallax>
                <Parallax className={classes.banner}>
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
                </Parallax>
            </ScrollableContainer>
        </ParallaxProvider>
    );
};

export default HomePage;
