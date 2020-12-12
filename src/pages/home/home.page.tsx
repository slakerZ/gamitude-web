import React, { Fragment, ReactElement, useState } from "react";
import { Helmet } from "react-helmet";
import ReactPageScroller from "react-page-scroller";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";

import { ReduxStateType } from "redux/root.reducer";
import { selectToken } from "redux/user/user.selectors";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";

import {
    OVERVIEW_TEXT,
    HOME_SECTIONS,
    ENERGIES_TEXT,
    STATS_TEXT,
    PROJECTS_TEXT,
    BULLET_JOURNAL_TEXT,
    CREATORS,
    ATTRIBUTIONS_PIXABAY,
    ATTRIBUTIONS_FLATICON,
    ATTRIBUTIONS_PEXELS,
    ATTRIBUTIONS_MIXKIT,
} from "./constants";
import useHomePageStyles from "./styles";
import {
    HomePagePropTypes,
    SlideContentTypePropTypes,
    CreatorType,
    AttributionType,
} from "./types";

const overview = require("assets/videos/overview.mp4");
const start = require("assets/videos/start.mp4");
const energies = require("assets/videos/energies.mp4");
const stats = require("assets/videos/stats.mp4");
const bulletJournal = require("assets/videos/bulletJournal.mp4");
const creators = require("assets/videos/creators.mp4");
const credits = require("assets/videos/credits.mp4");
const projects = require("assets/videos/projects.mp4");

const CreatorCard = ({ image, name, positions, links }: CreatorType) => {
    const classes = useHomePageStyles();

    return (
        <Card className={classes.creatorRoot}>
            <CardActionArea className={classes.creatorActionsArea}>
                <CardMedia
                    className={classes.creatorPhoto}
                    image={image}
                    title={name}
                />
                <CardContent className={classes.creatorContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    {positions.map((position, index) => {
                        return (
                            <Typography
                                key={index}
                                variant="body1"
                                component="p"
                            >
                                {position}
                            </Typography>
                        );
                    })}
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.creatorLinks}>
                {links.map(({ target, ref }, index) => {
                    return (
                        <IconButton aria-label="delete" key={index}>
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href={ref}
                            >
                                <CustomIcon size="xsmall" variant={target} />
                            </a>
                        </IconButton>
                    );
                })}
            </CardActions>
        </Card>
    );
};

const AttributionsList = ({ items }: { items: AttributionType[] }) => {
    const classes = useHomePageStyles();

    return (
        <List dense={true} className={classes.attrList}>
            {items.map(({ ref, name }, index) => {
                return (
                    <ListItem key={index}>
                        <a href={ref} target="_blank" rel="noopener noreferrer">
                            <ListItemText primary={name} />
                        </a>
                    </ListItem>
                );
            })}
        </List>
    );
};

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

const Slide = ({ children, background, title }: any) => {
    const classes = useHomePageStyles();

    return (
        <div className={classes.banner}>
            <video autoPlay loop muted className={classes.video}>
                <source src={background} type="video/mp4" />
            </video>
            <div className={classes.centered}>
                <div className={classes.flexColumn}>
                    <Typography component="h1" variant="h1">
                        {title}
                    </Typography>
                    {children}
                </div>
            </div>
        </div>
    );
};

const SlideContent = ({ contentText, token }: SlideContentTypePropTypes) => {
    const classes = useHomePageStyles();

    return (
        <Fragment>
            <Grid spacing={4} container className={classes.paragraphs}>
                {contentText.map(({ subtitle, paragraphs }, index) => {
                    return (
                        <Grid item xs={6} key={index}>
                            {subtitle && (
                                <Typography
                                    component="h2"
                                    variant="h3"
                                    align="center"
                                >
                                    {subtitle}
                                </Typography>
                            )}
                            {paragraphs.map((para, index) => {
                                return (
                                    <Typography
                                        key={index}
                                        component="p"
                                        variant="h6"
                                        paragraph
                                    >
                                        {para}
                                    </Typography>
                                );
                            })}
                        </Grid>
                    );
                })}
            </Grid>
            <GetStartedButton token={token} />
        </Fragment>
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
            <Helmet>
                <title>{"Gamitude - Manage your Energy not your Time"}</title>
            </Helmet>
            <div className={classes.fab}>
                <GetStartedButton token={token} />
            </div>
            <Stepper
                nonLinear
                activeStep={page}
                orientation="vertical"
                className={classes.pages}
            >
                {HOME_SECTIONS.map(({ label }, index) => {
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
                <Slide background={start}>
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
                </Slide>

                <Slide background={overview} title={"Overview"}>
                    <SlideContent contentText={OVERVIEW_TEXT} token={token} />
                </Slide>

                <Slide background={energies} title={"Energies"}>
                    <SlideContent contentText={ENERGIES_TEXT} token={token} />
                </Slide>

                <Slide background={stats} title={"Stats"}>
                    <SlideContent contentText={STATS_TEXT} token={token} />
                </Slide>

                <Slide background={projects} title={"Projects"}>
                    <SlideContent contentText={PROJECTS_TEXT} token={token} />
                </Slide>

                <Slide background={bulletJournal} title={"Bullet Journal"}>
                    <SlideContent
                        contentText={BULLET_JOURNAL_TEXT}
                        token={token}
                    />
                </Slide>

                <Slide background={creators} title={"Creators"}>
                    <Grid container spacing={8}>
                        {CREATORS.map(
                            ({ image, positions, links, name }, index) => {
                                return (
                                    <Grid item xs={4} key={index}>
                                        <CreatorCard
                                            image={image}
                                            positions={positions}
                                            links={links}
                                            name={name}
                                        />
                                    </Grid>
                                );
                            },
                        )}
                    </Grid>
                </Slide>

                <Slide background={credits} title={"Attributions"}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h2"
                                component="h2"
                                align="center"
                            >
                                {
                                    "Many thanks to these folks for amazing visual freebies!"
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <a
                                href="https://pixabay.com/"
                                target="_blank"
                                rel={"noopener noreferrer"}
                            >
                                <Typography variant="h3" component="h3">
                                    {"Pixabay"}
                                </Typography>
                            </a>
                            <AttributionsList items={ATTRIBUTIONS_PIXABAY} />
                        </Grid>
                        <Grid item xs={3}>
                            <a
                                href="https://www.flaticon.com/"
                                target="_blank"
                                rel={"noopener noreferrer"}
                            >
                                <Typography variant="h3" component="h3">
                                    {"Flaticon"}
                                </Typography>
                            </a>

                            <AttributionsList items={ATTRIBUTIONS_FLATICON} />
                        </Grid>
                        <Grid item xs={3}>
                            <a
                                href="https://www.pexels.com/"
                                target="_blank"
                                rel={"noopener noreferrer"}
                            >
                                <Typography variant="h3" component="h3">
                                    {"Pexels"}
                                </Typography>
                            </a>

                            <AttributionsList items={ATTRIBUTIONS_PEXELS} />
                        </Grid>
                        <Grid item xs={3}>
                            <a
                                href="https://mixkit.co/"
                                target="_blank"
                                rel={"noopener noreferrer"}
                            >
                                <Typography variant="h3" component="h3">
                                    {"Mixkit"}
                                </Typography>
                            </a>

                            <AttributionsList items={ATTRIBUTIONS_MIXKIT} />
                        </Grid>
                    </Grid>
                </Slide>
            </ReactPageScroller>
        </Fragment>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
});

export default connect(mapStateToProps)(HomePage);
