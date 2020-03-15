import React from "react";
import { connect } from "react-redux";
// Selectors
import {
    selectBreakInProgress,
    selectSessionInProgress,
    selectProjectsTab,
} from "../../redux/session/session.selectors";
//Actions
import { setProjectsTab } from "../../redux/session/session.actions";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";

const ProjectsNav = ({
    projectsTab,
    setProjectsTab,
    sessionInProgress,
    breakInProgress,
}) => {
    const useStyles = makeStyles(theme => ({
        appBar: {
            backgroundColor: "transparent",
        },
        tabs: {
            backgroundColor: theme.palette.tertriary.main,
            justifyContent: "center",
        },
    }));
    const classes = useStyles();

    const isDisabled = sessionInProgress || breakInProgress ? true : false;

    return (
        <AppBar position="static" className={classes.appBar}>
            <Tabs
                value={projectsTab}
                onChange={(event, newValue) => setProjectsTab(newValue)}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="simple tabs example"
                className={classes.tabs}
            >
                <Tab
                    icon={<CustomIcon variant="active" size="medium" />}
                    label="ACTIVE"
                    className={classes.tab}
                    disabled={isDisabled}
                />
                <Tab
                    icon={<CustomIcon variant="paused" size="medium" />}
                    label="PAUSED"
                    disabled={isDisabled}
                />
                <Tab
                    icon={<CustomIcon variant="done" size="medium" />}
                    label="DONE"
                    disabled={isDisabled}
                />
            </Tabs>
        </AppBar>
    );
};

const mapStateToProps = state => ({
    breakInProgress: selectBreakInProgress(state),
    sessionInProgress: selectSessionInProgress(state),
    projectsTab: selectProjectsTab(state),
});

const mapDispatchToProps = dispatch => ({
    setProjectsTab: value => dispatch(setProjectsTab(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsNav);
