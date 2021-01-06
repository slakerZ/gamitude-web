import React, { useState, Fragment, useEffect, ReactElement } from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { setFolders } from "redux/folders/folders.actions";
import { selectFolders } from "redux/folders/folders.selectors";
import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import {
    deleteFolderById,
    postFolder,
    putFolderById,
} from "api/folders/folders.api";

import { ICONS } from "components/atoms/custom-icon/constants";
import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import CustomToggleButtonGroup from "components/atoms/custom-toggle-button-group/custom-toggle-button-group.component";
import {
    a11yProps,
    TabPanel,
} from "components/atoms/tab-panel/tab-panel.component";

import CustomDialog from "./custom-dialog.component";
import useCustomDialogStyles from "./styles";
import { FolderSettingsPropTypes } from "./types";

const FolderSettingsDialog = ({
    open,
    setOpen,
    token,
    getFoldersList,
    setSnackbarState,
    folders,
    setFolders,
}: FolderSettingsPropTypes): ReactElement => {
    const classes = useCustomDialogStyles();

    // useState
    const [settingsTab, setSettingsTab] = useState("newFolder");
    const [currFolderId, setCurrFolderId] = useState(
        folders[0] ? folders[0].id : false,
    );
    const [currFolderName, setCurrFolderName] = useState(
        folders[0] ? folders[0].name : "",
    );
    const [currFolderIcon, setCurrFolderIcon] = useState(
        folders[0] ? folders[0].icon : "",
    );
    const [folderName, setFolderName] = useState("");
    const [folderIcon, setFolderIcon] = useState("");

    // useAsyncFn
    const [createNewFolderState, createNewFolder] = useAsyncFn(async () => {
        const requestBody = {
            name: folderName,
            icon: folderIcon,
            description: "",
        };
        const result = await postFolder(token, requestBody);
        setOpen(false);
        getFoldersList();
        // Reset
        setFolderName("");
        setFolderIcon("");

        return result;
    }, [folderName, folderIcon]);

    const [editFolderState, editFolder] = useAsyncFn(async () => {
        const requestBody = {
            name: currFolderName,
            icon: currFolderIcon,
            description: "",
        };
        const result = await putFolderById(
            token,
            requestBody,
            `${currFolderId}`,
        );
        getFoldersList();

        return result;
    }, [currFolderId, currFolderName, currFolderIcon]);

    const [deleteFolderState, deleteFolder] = useAsyncFn(async () => {
        const result = await deleteFolderById(token, `${currFolderId}`);
        getFoldersList();
        if (folders.length <= 1) {
            setSettingsTab("newFolder");
        }
        setCurrFolderId(false);
        setCurrFolderIcon("");
        setCurrFolderName("");

        return result;
    }, [currFolderId, folders]);

    // handlers
    const handleChangeCurrentFolder = (e: any, newId: any) => {
        const currFolder =
            folders.find((folder) => folder.id === newId) || folders[0];
        setCurrFolderId(newId);
        setCurrFolderName(currFolder.name);
        setCurrFolderIcon(currFolder.icon);
    };

    const handleChangeCurrFolderName = (e: any) => {
        setCurrFolderName(e.target.value);
    };

    const handleIconChange = (e: any, newIcon: any) => {
        setFolderIcon(newIcon);
    };
    const handleCurrIconChange = (e: any, newIcon: any) => {
        setCurrFolderIcon(newIcon);
    };

    const handleChangeFolderName = (e: any) => {
        setFolderName(e.target.value);
    };

    const handleSettingsTabChange = (e: any, newValue: string) => {
        setSettingsTab(newValue);
    };

    useEffect(() => {
        if (createNewFolderState.error) {
            setSnackbarState({
                message: "Failed to create new folder",
                severity: "error",
                open: true,
                autoHideDuration: 3000,
            });
        }
    }, [createNewFolderState, setSnackbarState]);

    useEffect(() => {
        if (editFolderState.error) {
            setSnackbarState({
                message: "Failed to edit folder",
                severity: "error",
                open: true,
                autoHideDuration: 3000,
            });
        }
    }, [editFolderState, setSnackbarState]);

    useEffect(() => {
        if (deleteFolderState.error) {
            setSnackbarState({
                message: "Failed to delete folder",
                severity: "error",
                open: true,
                autoHideDuration: 3000,
            });
        }
    }, [deleteFolderState, setSnackbarState]);

    return (
        <Fragment>
            <CustomDialog
                aria-label="Folder Settings Dialog"
                open={open}
                setOpen={setOpen}
                title={"Folders Settings"}
                onSubmit={
                    settingsTab === "newFolder" ? createNewFolder : editFolder
                }
            >
                <Tabs
                    value={settingsTab}
                    onChange={handleSettingsTabChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                    aria-label="Folder settings tabs"
                >
                    <Tab
                        label={"Create new folder"}
                        value={"newFolder"}
                        {...a11yProps(0, "newFolder")}
                    />
                    <Tab
                        label={"Edit folders"}
                        value={"editFolders"}
                        {...a11yProps(0, "editFolders")}
                        disabled={folders.length <= 0}
                    />
                </Tabs>
                <TabPanel
                    value={settingsTab}
                    index={"newFolder"}
                    id="newFolder"
                    role="directory"
                >
                    <div
                        aria-label="Create New Folder Dialog's Body"
                        className={classes.newFolderDialogBody}
                    >
                        <TextField
                            label={"Name"}
                            variant={"outlined"}
                            fullWidth
                            value={folderName}
                            onChange={handleChangeFolderName}
                        />

                        <Typography
                            variant={"h4"}
                            component={"h4"}
                            align={"center"}
                        >
                            {"Choose folder icon"}
                        </Typography>

                        <CustomToggleButtonGroup
                            value={folderIcon}
                            handleChange={handleIconChange}
                            items={ICONS}
                            exclusive={true}
                        />
                    </div>
                </TabPanel>
                <TabPanel
                    value={settingsTab}
                    index={"editFolders"}
                    id="editFolders"
                    role="directory"
                >
                    <div
                        aria-label="Create New Folder Dialog's Body"
                        className={classes.newFolderDialogBody}
                    >
                        <Grid container>
                            <Grid item xs={4}>
                                <Tabs
                                    selectionFollowsFocus
                                    aria-label="Folders navigation"
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={currFolderId}
                                    onChange={handleChangeCurrentFolder}
                                    className={classes.tabs}
                                >
                                    {folders.map(
                                        ({ name, icon, id }, index) => {
                                            return (
                                                <Tab
                                                    key={index}
                                                    label={name}
                                                    {...a11yProps(
                                                        index,
                                                        "folder-with-projects",
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
                                        },
                                    )}
                                </Tabs>
                            </Grid>
                            <Grid item xs={8}>
                                {currFolderId ? (
                                    <Fragment>
                                        <TextField
                                            label={"Name"}
                                            variant={"outlined"}
                                            fullWidth
                                            value={currFolderName}
                                            onChange={
                                                handleChangeCurrFolderName
                                            }
                                        />

                                        <Typography
                                            variant={"h4"}
                                            component={"h4"}
                                            align={"center"}
                                        >
                                            {"Choose folder icon"}
                                        </Typography>

                                        <CustomToggleButtonGroup
                                            value={currFolderIcon}
                                            handleChange={handleCurrIconChange}
                                            items={ICONS}
                                            exclusive={true}
                                        />

                                        <Typography
                                            variant={"h4"}
                                            component={"h4"}
                                            align={"center"}
                                        >
                                            {"Danger Zone"}
                                        </Typography>
                                        <Button onClick={deleteFolder}>
                                            {"Delete Folder"}
                                        </Button>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Typography
                                            variant={"h2"}
                                            component={"h2"}
                                            align={"center"}
                                        >
                                            {
                                                "<- Select folder to edit / delete"
                                            }
                                        </Typography>
                                    </Fragment>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </TabPanel>
            </CustomDialog>
        </Fragment>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
    folders: selectFolders(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
    setFolders: (value: any) => dispatch(setFolders(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FolderSettingsDialog);
