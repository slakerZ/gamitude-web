import React from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { setProjectTasks } from "redux/projectTasks/projectTasks.actions";
import { selectProjectTasks } from "redux/projectTasks/projectTasks.selectors";
import { setProjects } from "redux/projects/projects.actions";
import { selectProjects } from "redux/projects/projects.selectors";
import { selectToken } from "redux/user/user.selectors";

import { getProjects } from "api/projects/projects.api";

import { TabPanel } from "components/atoms/tab-panel/tab-panel.component";
import ToggleableTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import TaskTile from "components/molecules/task-tile/task-tile.component";

import useProjectTaskStyles from "./styles";
import { ProjectTaskPropTypes } from "./types";

const BulletTask = ({
    token,
    tasksCurrPageIndex,
    currJournalId,
    currPageId,
    projectTask,
    getProjectTasksList,
    handleOpenNewProjectTaskDialog,
}: ProjectTaskPropTypes) => {
    const classes = useProjectTaskStyles();
    const [getProjectsListState, getProjectsList] = useAsyncFn(async () => {
        const response = await getProjects(token);
        const result = response.data;
        setProjects(result);
        return result;
    });
    return (
        <div>
            <TabPanel
                value={tasksCurrPageIndex}
                index={tasksCurrPageIndex}
                role={"Tasks"}
                id={"tasks"}
            >
                <div className={classes.task}>
                    <TaskTile
                        projectTask={projectTask}
                        getProjectsList={getProjectsList}
                        getProjectTasksList={getProjectTasksList}
                        currJournalId={currJournalId}
                        currPageId={currPageId}
                    />
                </div>
            </TabPanel>
        </div>
    );
};
const mapStateToProps = (state: any) => ({
    token: selectToken(state),
    projectTasks: selectProjectTasks(state),
    projects: selectProjects(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setProjectTasks: (value: any) => dispatch(setProjectTasks(value)),
    setProjects: (value: any) => dispatch(setProjects(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BulletTask);
