import React from "react";
import { connect } from "react-redux";
// Selectors
import { selectProjects } from "../../redux/projects/projects.selectors";
import {
    selectBreakInProgress,
    selectSessionInProgress,
    selectProjectsTab,
} from "../../redux/session/session.selectors";
// UI core
import { makeStyles } from "@material-ui/core/styles";

// Components
import Project from "../project/project.component.jsx";
import MuiTab from "../mui-tab/mui-tab.component.jsx";
import ProjectAdd from "../project-add/project-add.component.jsx";

import ProjectBreakTimer from "../project-break-timer/project-break-timer.component.jsx";

//test
import ProjectsNav from "../projects-nav/projects-nav.component.jsx";

const Projects = ({ projects, projectsTab }) => {
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
            backgroundColor: theme.palette.tertriary.main,
            justifyContent: "center",
        },
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ProjectsNav />

            {projects.map(project => {
                const { status } = project;
                const index = projects.indexOf(project);
                return (
                    <MuiTab
                        key={index}
                        value={parseInt(projectsTab)}
                        currTab={status}
                    >
                        <Project index={index} />
                    </MuiTab>
                );
            })}
            <ProjectBreakTimer />
            {projectsTab === 0 ? <ProjectAdd /> : null}
        </div>
    );
};

const mapStateToProps = state => ({
    projects: selectProjects(state),
    breakInProgress: selectBreakInProgress(state),
    sessionInProgress: selectSessionInProgress(state),
    projectsTab: selectProjectsTab(state),
});

export default connect(mapStateToProps)(Projects);
