import { EnergyType, StatType } from "types";
import { ProjectSessionType } from "types";

import React, { useState, Fragment, useEffect, ReactElement } from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import { postProject } from "api/projects/projects.api";

import BoostedDominantBtnGroup from "components/molecules/boosted-dominant-btn-group/boosted-dominant-btn-group.component";

import CustomDialog from "./custom-dialog.component";
import { NewProjectDialogPropTypes } from "./types";

const NewProjectDialog = ({
    open,
    setOpen,
    token,
    getProjectsList,
    setSnackbarState,
}: NewProjectDialogPropTypes): ReactElement => {
    const [name, setName] = useState("");
    const [projectType, setProjectType] = useState<ProjectSessionType>("STAT");
    const [stats, setStats] = useState<StatType[] | EnergyType[] | any[]>([]);
    const [dominantStat, setDominantStat] = useState<
        StatType | EnergyType | string
    >("");
    const [folderId, setFolderId] = useState("");
    const [defaultTimerId, setDefaultTimerId] = useState("");

    const [createNewProjectState, createNewProject] = useAsyncFn(async () => {
        const requestBody = {
            name: name,
            folderId: folderId,
            defaultTimerId: defaultTimerId,
            projectType: projectType,
            dominantStat: dominantStat,
            stats: stats,
            daysPerWeek: 0,
            hoursPerDay: 0,
            dayInterval: 0,
        };
        const result = await postProject(token, requestBody);
        setOpen(false);
        getProjectsList();
        // Success Info
        setSnackbarState({
            message: "Successfully created project",
            severity: "success",
            open: true,
            autoHideDuration: 3000,
        });

        // Reset
        setName("");
        setProjectType("STAT");
        setStats([]);
        setDominantStat("");
        setFolderId("");
        setDefaultTimerId("");
        return result.data;
    }, [
        name,
        folderId,
        defaultTimerId,
        projectType,
        stats,
        dominantStat,
        setSnackbarState,
    ]);

    useEffect(() => {
        if (createNewProjectState.error) {
            setSnackbarState({
                message: "Failed to create new project",
                severity: "error",
                open: true,
                autoHideDuration: 3000,
            });
        }
    }, [createNewProjectState, setSnackbarState]);

    return (
        <Fragment>
            <CustomDialog
                aria-label="Create New Project Dialog"
                open={open}
                setOpen={setOpen}
                title={"Create new project"}
                onSubmit={createNewProject}
            >
                <BoostedDominantBtnGroup
                    boosted={stats}
                    setBoosted={setStats}
                    dominant={dominantStat}
                    setDominant={setDominantStat}
                    name={name}
                    setName={setName}
                    sessionType={projectType}
                    setSessionType={setProjectType}
                    folder={folderId}
                    setFolder={setFolderId}
                    method={defaultTimerId}
                    setMethod={setDefaultTimerId}
                />
            </CustomDialog>
        </Fragment>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectDialog);
