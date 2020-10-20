import { ProjectsActionTypes } from "./projects.types";
import {
    SetBoostedPropTypes,
    SetBoostedReturnValues,
    SetDominantPropTypes,
    SetDominantReturnValues,
    SetNamePropTypes,
    SetNameReturnValues,
    SetMethodPropTypes,
    SetMethodReturnValues,
} from "./types";

export const setBoosted = ({
    index,
    newBoosted,
}: SetBoostedPropTypes): SetBoostedReturnValues => ({
    type: ProjectsActionTypes.SET_BOOSTED,
    index: index,
    boosted: newBoosted,
});

export const setDominant = ({
    index,
    newDominant,
}: SetDominantPropTypes): SetDominantReturnValues => ({
    type: ProjectsActionTypes.SET_DOMINANT,
    dominant: newDominant,
    index: index,
});

export const setName = ({
    index,
    name,
}: SetNamePropTypes): SetNameReturnValues => ({
    type: ProjectsActionTypes.SET_NAME,
    index: index,
    name: name,
});

export const setMethod = ({
    index,
    method,
}: SetMethodPropTypes): SetMethodReturnValues => ({
    type: ProjectsActionTypes.SET_METHOD,
    method: method,
    index: index,
});

export const setStatus = ({
    index,
    status,
}: {
    index: number;
    status: any;
}) => ({
    type: ProjectsActionTypes.SET_STATUS,
    status: status,
    index: index,
});

export const addProject = (payload: any) => ({
    type: ProjectsActionTypes.ADD_PROJECT,
    payload: payload,
});

export const deleteProject = (index: any) => ({
    type: ProjectsActionTypes.DELETE_PROJECT,
    index: index,
});

export const setProjects = (value: any) => ({
    type: ProjectsActionTypes.SET_PROJECTS,
    payload: value,
});
