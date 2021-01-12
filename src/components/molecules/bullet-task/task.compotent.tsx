import React from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import RadioGroup from "@material-ui/core/RadioGroup";
import Skeleton from "@material-ui/lab/Skeleton";

import { setProjectTasks } from "redux/projectTasks/projectTasks.actions";
import { selectProjectTasks } from "redux/projectTasks/projectTasks.selectors";
import { setProjects } from "redux/projects/projects.actions";
import { selectProjects } from "redux/projects/projects.selectors";
import {
    selectIsBreak,
    selectSessionInProgress,
} from "redux/session/session.selectors";
import { selectToken } from "redux/user/user.selectors";

import { getProjects } from "api/projects/projects.api";

import { TabPanel } from "components/atoms/tab-panel/tab-panel.component";

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
    selectedProjectTask,
    setSelectedProjectTask,
    sessionInProgress,
    isBreak,
}: ProjectTaskPropTypes) => {
    const classes = useProjectTaskStyles();

    //useAsync
    const [getProjectsListState, getProjectsList] = useAsyncFn(async () => {
        const response = await getProjects(token);
        const result = response.data;
        setProjects(result);
        return result;
    });

    //handlers
    const handleChangeSelectedTaskId = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!sessionInProgress && !isBreak) {
            setSelectedProjectTask((event.target as HTMLInputElement).value);
        }
    };

    return (
        <div className={classes.task}>
            <TabPanel
                value={tasksCurrPageIndex}
                index={tasksCurrPageIndex}
                role={"menuitem"}
                id={`tasks_${projectTask.id}`}
            >
                <RadioGroup
                    aria-label={`selected_task_${projectTask.id}`}
                    name={`selected_task_${projectTask.id}`}
                    value={selectedProjectTask}
                    onChange={handleChangeSelectedTaskId}
                >
                    {getProjectsListState.loading ? (
                        <Skeleton animation="wave" variant="rect" />
                    ) : (
                        <TaskTile
                            projectTask={projectTask}
                            getProjectsList={getProjectsList}
                            getProjectTasksList={getProjectTasksList}
                            currJournalId={currJournalId}
                            currPageId={currPageId}
                        />
                    )}
                </RadioGroup>
            </TabPanel>
        </div>
    );
};
const mapStateToProps = (state: any) => ({
    token: selectToken(state),
    projectTasks: selectProjectTasks(state),
    projects: selectProjects(state),
    sessionInProgress: selectSessionInProgress(state),
    isBreak: selectIsBreak(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setProjectTasks: (value: any) => dispatch(setProjectTasks(value)),
    setProjects: (value: any) => dispatch(setProjects(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BulletTask);
