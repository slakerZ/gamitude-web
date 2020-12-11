import React, { Fragment, ReactElement, useState } from "react";
import ReactPageScroller from "react-page-scroller";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepContent from "@material-ui/core/StepContent";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";

import { OverviewText_1, OverviewText_2, MenuItems } from "./constants";
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

    const [page, setPage] = useState(0);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <Fragment>
            <div className={classes.fab}>
                <GetStartedButton />
            </div>
            <Stepper
                nonLinear
                activeStep={page}
                orientation="vertical"
                className={classes.pages}
            >
                {MenuItems.map(({ label }, index) => {
                    return (
                        <Step key={index}>
                            <StepButton onClick={() => handlePageChange(index)}>
                                <Typography component="span" variant="body1">
                                    {label}
                                </Typography>
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
            <ReactPageScroller
                animationTime={1000}
                customPageNumber={page}
                pageOnChange={handlePageChange}
            >
                <div
                    className={classes.banner}
                    aria-label="Slogan Banner"
                    id="slogan"
                >
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
                <div className={classes.banner} id="Overview">
                    <video autoPlay loop muted className={classes.video}>
                        <source src={time_passes} type="video/mp4" />
                    </video>
                    <div className={classes.centered}>
                        <div className={classes.flexColumn}>
                            <Typography component="h1" variant="h1">
                                {"Overview"}
                            </Typography>
                            <Grid
                                spacing={4}
                                container
                                className={classes.paragraphs}
                            >
                                <Grid item xs={6}>
                                    {OverviewText_1.map((para, index) => {
                                        return (
                                            <Typography
                                                key={index}
                                                component="p"
                                                variant="h6"
                                                paragraph
                                                align="center"
                                            >
                                                {para}
                                            </Typography>
                                        );
                                    })}
                                </Grid>
                                <Grid item xs={6}>
                                    {OverviewText_2.map((para, index) => {
                                        return (
                                            <Typography
                                                key={index}
                                                component="p"
                                                variant="h6"
                                                paragraph
                                                align="center"
                                            >
                                                {para}
                                            </Typography>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                            <GetStartedButton />
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
            </ReactPageScroller>
        </Fragment>
    );
};

export default HomePage;
