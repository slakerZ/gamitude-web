import React from "react";
import { connect } from "react-redux";
// Selectors
import {
    selectProjects,
    selectBreakInProgress,
    selectSessionInProgress,
} from "../../redux/projects/projects.selectors";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// Components
import Project from "../project/project.component.jsx";
import ProjectTab from "../project-tab/project-tab.component.jsx";
import ProjectAdd from "../project-add/project-add.component.jsx";
import CustomIcon from "../custom-icon/custom-icon.component.jsx";

const Projects = ({ projects, sessionInProgress, breakInProgress }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            backgroundColor: "transparent",
            gridArea: "projects",
            boxShadow: "5px 5px 10px #000000",
            overflow: "auto",
        },
        appBar: {
            backgroundColor: "transparent",
        },
        tabs: {
            backgroundColor: theme.palette.secondary.dark,
            justifyContent: "center",
        },
    }));
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Tabs
                    value={value}
                    onChange={handleChange}
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
                        disabled={sessionInProgress || breakInProgress}
                    />
                    <Tab
                        icon={<CustomIcon variant="paused" size="medium" />}
                        label="PAUSED"
                        disabled={sessionInProgress || breakInProgress}
                    />
                    <Tab
                        icon={<CustomIcon variant="done" size="medium" />}
                        label="DONE"
                        disabled={sessionInProgress || breakInProgress}
                    />
                </Tabs>
            </AppBar>

            {projects.map(project => {
                const { status, dominant, name, method } = project;
                const index = projects.indexOf(project);
                return (
                    <ProjectTab key={index} value={value} currTab={status}>
                        <Project
                            // TODO change to the method that get's rid of drilling index down
                            dominant={dominant}
                            index={index}
                            status={status}
                            name={name}
                            method={method}
                        />
                    </ProjectTab>
                );
            })}
            {value === 0 ? <ProjectAdd /> : null}
        </div>
    );
};

const mapStateToProps = state => ({
    projects: selectProjects(state),
    breakInProgress: selectBreakInProgress(state),
    sessionInProgress: selectSessionInProgress(state),
});

export default connect(mapStateToProps)(Projects);
