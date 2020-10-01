import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useAsyncFn, useEffectOnce } from "react-use";
// API
import { url, headers, parseProjects } from "../../api/projects.api";
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
// Components
import Project from "../../components/molecules/project/project.component";
import MuiTab from "../../components/atoms/mui-tab/mui-tab.component";
import ProjectAdd from "../../components/molecules/project-add/project-add.component";
import ProjectBreakTimer from "../../components/organisms/project-break-timer/project-break-timer.component";
import ProjectsNav from "../../components/molecules/projects-nav/projects-nav.component";
import ProjectsBackend from "../../components/atoms/projects-backend/projects-backend.component";
// Local
import useProjectDesktopStyles from "./styles";

const ProjectsDesktopPage = ({
    projects,
    projectsTab,
    setProjects,
    token,
}: {
    projects: any;
    projectsTab: any;
    setProjects: any;
    token: any;
}) => {
    const classes = useProjectDesktopStyles();

    const [state, submit] = useAsyncFn(async () => {
        const response = await axios.get(url, headers(token));
        const result = await response.data;
        const parsedProjects = parseProjects(result);
        setProjects(parsedProjects);
        return result;
    }, [url]);

    useEffectOnce(() => {
        submit();
    });

    return (
        <div className={classes.root}>
            <ProjectsNav />

            {projects.map((project: any) => {
                const { status } = project;
                const index = projects.indexOf(project);
                return (
                    <MuiTab key={index} value={projectsTab} currTab={status}>
                        <Project index={index} />
                    </MuiTab>
                );
            })}

            <ProjectsBackend state={state} />
            <ProjectBreakTimer />

            {projectsTab === 0 ? <ProjectAdd /> : null}
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
    breakInProgress: selectBreakInProgress(state),
    sessionInProgress: selectSessionInProgress(state),
    projectsTab: selectProjectsTab(state),
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setProjects: (value: any) => dispatch(setProjects(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsDesktopPage);
