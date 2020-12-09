import { ProjectTaskType } from "api/projectTasks/types";

import { ProjectTasksActionTypes } from "./projectTasks.types";

export const addProjectTask = (value: ProjectTaskType) => ({
    type: ProjectTasksActionTypes.ADD_PROJECT_TASK,
    payload: value,
});

export const setProjectTasks = (value: any) => ({
    type: ProjectTasksActionTypes.SET_PROJECT_TASKS,
    payload: value,
});
