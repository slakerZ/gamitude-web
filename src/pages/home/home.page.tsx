import React, { Fragment, ReactElement, useState } from "react";
import ReactPageScroller from "react-page-scroller";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";

import { ReduxStateType } from "redux/root.reducer";
import { selectToken } from "redux/user/user.selectors";

import { OverviewText_1, OverviewText_2, MenuItems } from "./constants";
import useHomePageStyles from "./styles";
import { HomePagePropTypes } from "./types";

const overview = require("assets/videos/overview.mp4");
const gamitudeEnergy = require("assets/videos/gamitude.mp4");
const energies = require("assets/videos/energies.mp4");
const stats = require("assets/videos/stats.mp4");
const ranks = require("assets/videos/ranks.mp4");
const bulletJournal = require("assets/videos/bulletJournal.mp4");
const creators = require("assets/videos/creators.mp4");
const credits = require("assets/videos/credits.mp4");

const GetStartedButton = ({ token }: HomePagePropTypes) => {
    const classes = useHomePageStyles();

    return (
        <Button
            component={Link}
            to={token ? "/projects" : "/signInSignUp"}
            variant="outlined"
            color="secondary"
            size="large"
            className={classes.button}
        >
            {"Get started!"}
        </Button>
    );
};

const HomePage = ({ token }: HomePagePropTypes): ReactElement => {
    const classes = useHomePageStyles();

    const [page, setPage] = useState(0);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <Fragment>
            <div className={classes.fab}>
                <GetStartedButton token={token} />
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
                    id="Start"
                >
                    <video autoPlay loop muted className={classes.video}>
                        <source src={gamitudeEnergy} type="video/mp4" />
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
                            <GetStartedButton token={token} />
                        </div>
                    </div>
                </div>
                <div className={classes.banner} id="Overview">
                    <video autoPlay loop muted className={classes.video}>
                        <source src={overview} type="video/mp4" />
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
                            <GetStartedButton token={token} />
                        </div>
                    </div>
                </div>
                <div className={classes.banner} id="Energies">
                    <video autoPlay loop muted className={classes.video}>
                        <source src={energies} type="video/mp4" />
                    </video>
                    <div className={classes.centered}>
                        <div className={classes.flexColumn}>
                            <Typography component="h1" variant="h1">
                                {"Energies"}
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
                            <GetStartedButton token={token} />
                        </div>
                    </div>
                </div>
                <div className={classes.banner} id="Stats">
                    <video autoPlay loop muted className={classes.video}>
                        <source src={stats} type="video/mp4" />
                    </video>
                    <div className={classes.centered}>
                        <div className={classes.flexColumn}>
                            <Typography component="h1" variant="h1">
                                {"Stats"}
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
                            <GetStartedButton token={token} />
                        </div>
                    </div>
                </div>
                <div className={classes.banner} id="Ranks">
                    <video autoPlay loop muted className={classes.video}>
                        <source src={ranks} type="video/mp4" />
                    </video>
                    <div className={classes.centered}>
                        <div className={classes.flexColumn}>
                            <Typography component="h1" variant="h1">
                                {"Ranks"}
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
                            <GetStartedButton token={token} />
                        </div>
                    </div>
                </div>
                <div className={classes.banner} id="Bullet Journal">
                    <video autoPlay loop muted className={classes.video}>
                        <source src={bulletJournal} type="video/mp4" />
                    </video>
                    <div className={classes.centered}>
                        <div className={classes.flexColumn}>
                            <Typography component="h1" variant="h1">
                                {"Bullet Journal"}
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
                            <GetStartedButton token={token} />
                        </div>
                    </div>
                </div>
                <div className={classes.banner} id="Creators">
                    <video autoPlay loop muted className={classes.video}>
                        <source src={creators} type="video/mp4" />
                    </video>
                    <div className={classes.centered}>
                        <div className={classes.flexColumn}>
                            <Typography component="h1" variant="h1">
                                {"Creators"}
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
                            <GetStartedButton token={token} />
                        </div>
                    </div>
                </div>
                <div className={classes.banner} id="Attributions">
                    <video autoPlay loop muted className={classes.video}>
                        <source src={credits} type="video/mp4" />
                    </video>
                    <div className={classes.centered}>
                        <div className={classes.flexColumn}>
                            <Typography component="h1" variant="h1">
                                {"Attributions"}
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
                            <GetStartedButton token={token} />
                        </div>
                    </div>
                </div>
            </ReactPageScroller>
        </Fragment>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
});

export default connect(mapStateToProps)(HomePage);
