import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useEffectOnce } from "react-use";
// Actions
import { setProjects } from "../../redux/projects/projects.actions";
// Selectors
import { selectToken } from "../../redux/user/user.selectors";
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
import ProjectsNav from "../projects-nav/projects-nav.component.jsx";

const Projects = ({ projects, projectsTab, setProjects, token }) => {
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

    useEffectOnce(() => {
        const url = "http://gamitude.rocks:31778/api/pro/Projects";
        axios
            .get(url, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then(response => {
                console.log(response.data);
                const parsedProjects = response.data.map(project => {
                    return {
                        id: project.id,
                        name: project.name,
                        method: mapPrimaryMethodToMethod(project.primaryMethod),
                        status: mapProjectStatusToStatus(project.projectStatus),
                        boosted: mapStatsToBoosted(project.stats),
                        dominant: mapDominantStatToDominant(
                            project.dominantStat
                        ),
                    };
                });
                setProjects(parsedProjects);
            });
    });

    const mapPrimaryMethodToMethod = primaryMethod => {
        switch (primaryMethod) {
            case "POMODORO":
                return 25;
        }
    };

    const mapProjectStatusToStatus = projectStatus => {
        switch (projectStatus) {
            case "ACTIVE":
                return 0;
            case "PAUSED":
                return 1;
            case "DONE":
                return 2;
        }
    };

    const mapStatsToBoosted = stats => {
        return stats.map(stat => {
            return stat.toLowerCase();
        });
    };

    const mapDominantStatToDominant = dominantStat => {
        return dominantStat.toLowerCase();
    };

    return (
        <div className={classes.root}>
            <ProjectsNav />

            {projects.map(project => {
                const { status } = project;
                const index = projects.indexOf(project);
                return (
                    <MuiTab key={index} value={projectsTab} currTab={status}>
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
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    setProjects: value => dispatch(setProjects(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
