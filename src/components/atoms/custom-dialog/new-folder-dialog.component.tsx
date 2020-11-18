import React, { useState, Fragment, useEffect, ReactElement } from "react";
import { NewFolderDialogPropTypes } from "./types";
import CustomDialog from "./custom-dialog.component";
import useCustomDialogStyles from "./styles";
import { useAsyncFn } from "react-use";
import { postFolder } from "api/folders/folders.api";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CustomToggleButtonGroup from "components/atoms/custom-toggle-button-group/custom-toggle-button-group.component";
import { ICONS } from "components/atoms/custom-icon/constants";
import { connect } from "react-redux";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";
import { ReduxStateType } from "redux/root.reducer";

const NewFolderDialog = ({
    open,
    setOpen,
    token,
    getFoldersList,
    setSnackbarState,
}: NewFolderDialogPropTypes): ReactElement => {
    const classes = useCustomDialogStyles();

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

    useEffect(() => {
        if (createNewFolderState.error) {
            setSnackbarState({
                message: "Failed to create new folder",
                severity: "error",
                open: true,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewFolderDialog);
