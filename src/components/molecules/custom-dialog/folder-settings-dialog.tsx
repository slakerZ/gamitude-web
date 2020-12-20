import React, { useState, Fragment, useEffect, ReactElement } from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import { Tab, Tabs } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { setFolders } from "redux/folders/folders.actions";
import { selectFolders } from "redux/folders/folders.selectors";
import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import { postFolder } from "api/folders/folders.api";

import { ICONS } from "components/atoms/custom-icon/constants";
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

    const [settingsTab, setSettingsTab] = useState("newFolder");
    const [folderName, setFolderName] = useState("");
    const [folderIcon, setFolderIcon] = useState("");
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

    const handleIconChange = (e: any, newIcon: any) => {
        setFolderIcon(newIcon);
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

    return (
        <Fragment>
            <CustomDialog
                aria-label="Create New Folder Dialog"
                open={open}
                setOpen={setOpen}
                title={"Create New Folder"}
                onSubmit={createNewFolder}
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
                    <div />
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
