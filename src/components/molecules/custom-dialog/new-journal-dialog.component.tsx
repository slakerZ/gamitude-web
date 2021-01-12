import React, { useState, Fragment, useEffect, ReactElement } from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { selectJournals } from "redux/journals/journals.selectors";
import { selectProjects } from "redux/projects/projects.selectors";
import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import {
    deleteJournalById,
    postJournal,
    putJournalById,
} from "api/bulletJournal/journals.api";

import { ICONS } from "components/atoms/custom-icon/constants";
import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import CustomToggleButtonGroup from "components/atoms/custom-toggle-button-group/custom-toggle-button-group.component";
import {
    a11yProps,
    TabPanel,
} from "components/atoms/tab-panel/tab-panel.component";

import CustomDialog from "./custom-dialog.component";
import useCustomDialogStyles from "./styles";
import { NewJournalDialogPropTypes } from "./types";

const NewJournalDialog = ({
    open,
    setOpen,
    token,
    projects,
    journals,
    getJournalsList,
    setSnackbarState,
}: NewJournalDialogPropTypes): ReactElement => {
    const classes = useCustomDialogStyles();

    //useState
    const [settingsJournalTab, setSettingsJournalTab] = useState("newJournal");
    const [journalName, setJournalName] = useState("");
    const [journalIcon, setJournalIcon] = useState("");
    const [taskAssociatedProject, setTaskAssociatedProject] = useState("");

    const [currJournalId, setCurrJournalId] = useState(
        journals[0] ? journals[0].id : false,
    );
    const [currJournalName, setCurrJournalName] = useState(
        journals[0] ? journals[0].name : "",
    );
    const [currJournalIcon, setCurrJournalIcon] = useState(
        journals[0] ? journals[0].icon : "",
    );
    const [currJournalrProject, setCurrJournalProject] = useState(
        journals[0] && journals[0].projectId !== null
            ? journals[0].projectId
            : "",
    );

    //useAsync
    const [createNewJournalState, createNewJournal] = useAsyncFn(async () => {
        const requestBody = {
            projectId: null,

            name: journalName,

            icon: journalIcon,

            description: "",
        };
        const result = await postJournal(token, requestBody);
        setOpen(false);
        getJournalsList();
        // Reset
        setJournalName("");
        setJournalIcon("");
        setTaskAssociatedProject("");

        return result;
    }, [journalName, journalIcon]);

    const [editJournalState, editJournal] = useAsyncFn(async () => {
        const requestBody = {
            name: currJournalName,
            icon: currJournalIcon,
            description: "",
            projectId: currJournalrProject,
        };
        const result = await putJournalById(
            token,
            requestBody,
            `${currJournalId}`,
        );
        getJournalsList();

        return result;
    }, [currJournalId, currJournalName, currJournalIcon, currJournalrProject]);

    const [deleteJournalState, deleteJournal] = useAsyncFn(async () => {
        const result = await deleteJournalById(token, `${currJournalId}`);
        getJournalsList();
        if (journals.length <= 1) {
            setSettingsJournalTab("newJournal");
        }
        setCurrJournalId(false);
        setCurrJournalIcon("");
        setCurrJournalName("");
        setCurrJournalProject("");

        return result;
    }, [currJournalId, journals]);

    //handlers
    const handleChangeCurrentJournal = (e: any, newId: string) => {
        const currJournal =
            journals.find((journal) => journal.id === newId) || journals[0];
        setCurrJournalId(newId);
        setCurrJournalName(currJournal.name);
        setCurrJournalIcon(currJournal.icon);
        setCurrJournalProject(currJournal.projectId);
    };

    const handleSettingsJournalTabChange = (e: any, newValue: string) => {
        setSettingsJournalTab(newValue);
    };

    const handleChangeCurrJournalName = (e: any) => {
        setCurrJournalName(e.target.value);
    };

    const handleChangeCurrJournalIcon = (e: any, newIcon: string) => {
        setCurrJournalIcon(newIcon);
    };

    const handleChangeCurrJournalProject = (e: any) => {
        setCurrJournalProject(e.target.value);
    };

    const handleIconChange = (e: any, newIcon: string) => {
        setJournalIcon(newIcon);
    };

    const handleChangeJournalName = (e: any) => {
        setJournalName(e.target.value);
    };

    const handleTaskAssociatedProjectChange = (e: any) => {
        setTaskAssociatedProject(e.target.value);
    };

    //useEffects
    useEffect(() => {
        if (createNewJournalState.error) {
            setSnackbarState({
                message: "Failed to create new journal",
                severity: "error",
                open: true,
            });
        }
    }, [createNewJournalState, setSnackbarState]);

    useEffect(() => {
        if (editJournalState.error) {
            setSnackbarState({
                message: "Failed to edit journal",
                severity: "error",
                open: true,
            });
        }
    }, [editJournalState, setSnackbarState]);

    useEffect(() => {
        if (deleteJournalState.error) {
            setSnackbarState({
                message: "Failed to delete journal",
                severity: "error",
                open: true,
            });
        }
    }, [deleteJournalState, setSnackbarState]);

    return (
        <Fragment>
            <CustomDialog
                aria-label="Create New Journal Dialog"
                open={open}
                setOpen={setOpen}
                title={"Create New Journal"}
                onSubmit={
                    settingsJournalTab === "newJournal"
                        ? createNewJournal
                        : editJournal
                }
            >
                <Tabs
                    value={settingsJournalTab}
                    onChange={handleSettingsJournalTabChange}
                    variant="fullWidth"
                    aria-label="Journal settings tabs"
                    className={classes.navTabs}
                >
                    <Tab
                        label={"Create new journal"}
                        value={"newJournal"}
                        // {...a11yProps(0, "newJournal")}
                    />
                    <Tab
                        label={"Edit journals"}
                        value={"editJournals"}
                        // {...a11yProps(0, "editJournals")}
                        disabled={journals.length <= 0}
                    />
                </Tabs>
                <TabPanel
                    value={settingsJournalTab}
                    index={"newJournal"}
                    id="newJournal"
                    role="directory"
                >
                    <div
                        aria-label="Create New Journal Dialog's Body"
                        className={classes.newFolderDialogBody}
                    >
                        <TextField
                            label={"Name"}
                            variant={"outlined"}
                            fullWidth
                            value={journalName}
                            onChange={handleChangeJournalName}
                        />

                        <TextField
                            aria-label="Select Associated Project"
                            label="ASSOCIATED PROJECT"
                            select
                            variant="outlined"
                            value={taskAssociatedProject}
                            onChange={handleTaskAssociatedProjectChange}
                            fullWidth
                        >
                            {projects.map(({ name, id }, index) => {
                                return (
                                    <MenuItem key={index} value={id}>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                        </TextField>

                        <Typography
                            variant={"h4"}
                            component={"h4"}
                            align={"center"}
                        >
                            {"Choose journal icon"}
                        </Typography>

                        <CustomToggleButtonGroup
                            value={journalIcon}
                            handleChange={handleIconChange}
                            items={ICONS}
                            exclusive={true}
                        />
                    </div>
                </TabPanel>
                <TabPanel
                    value={settingsJournalTab}
                    index={"editJournals"}
                    id="editJournals"
                    role="directory"
                >
                    <Grid container>
                        <Grid item xs={4}>
                            <Tabs
                                selectionFollowsFocus
                                aria-label="Journals navigation"
                                orientation="vertical"
                                variant="scrollable"
                                value={currJournalId}
                                onChange={handleChangeCurrentJournal}
                                className={classes.editTimerTabs}
                            >
                                {journals.map(({ name, icon, id }, index) => {
                                    return (
                                        <Tab
                                            key={index}
                                            label={name}
                                            {...a11yProps(
                                                index,
                                                "journal-with-pages",
                                            )}
                                            icon={
                                                <CustomIcon
                                                    variant={icon}
                                                    size="small"
                                                />
                                            }
                                            value={id}
                                        />
                                    );
                                })}
                            </Tabs>
                            <div className={classes.delButtonWrapper}>
                                <Button
                                    onClick={deleteJournal}
                                    className={classes.delButton}
                                >
                                    <Typography
                                        variant={"h5"}
                                        component={"h5"}
                                        className={classes.delButtonTypo}
                                    >
                                        {"Delete Journal"}
                                    </Typography>
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            {currJournalId ? (
                                <Box p={2}>
                                    <TextField
                                        label={"Name"}
                                        variant={"outlined"}
                                        fullWidth
                                        value={currJournalName}
                                        onChange={handleChangeCurrJournalName}
                                    />

                                    <Typography
                                        variant={"h4"}
                                        component={"h4"}
                                        align={"center"}
                                    >
                                        {"Choose journal icon"}
                                    </Typography>

                                    <CustomToggleButtonGroup
                                        value={currJournalIcon}
                                        handleChange={
                                            handleChangeCurrJournalIcon
                                        }
                                        items={ICONS}
                                        exclusive={true}
                                    />
                                    <TextField
                                        aria-label="Select Associated Project"
                                        label="ASSOCIATED PROJECT"
                                        select
                                        variant="outlined"
                                        value={
                                            currJournalrProject === null
                                                ? ""
                                                : currJournalrProject
                                        }
                                        onChange={
                                            handleChangeCurrJournalProject
                                        }
                                        fullWidth
                                    >
                                        {projects.map(({ name, id }, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    value={id}
                                                >
                                                    {name}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </Box>
                            ) : (
                                <Fragment>
                                    <Typography
                                        variant={"h2"}
                                        component={"h2"}
                                        align={"center"}
                                    >
                                        {"<- Select journal to edit / delete"}
                                    </Typography>
                                </Fragment>
                            )}
                        </Grid>
                    </Grid>
                </TabPanel>
            </CustomDialog>
        </Fragment>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
    projects: selectProjects(state),
    journals: selectJournals(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewJournalDialog);
