import React, { useState, Fragment, useEffect, ReactElement } from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import { postJournal } from "api/bulletJournal/journals.api";

import { ICONS } from "components/atoms/custom-icon/constants";
import CustomToggleButtonGroup from "components/atoms/custom-toggle-button-group/custom-toggle-button-group.component";

import CustomDialog from "./custom-dialog.component";
import useCustomDialogStyles from "./styles";
import { NewJournalDialogPropTypes } from "./types";

const NewJournalDialog = ({
    open,
    setOpen,
    token,
    getJournalsList,
    setSnackbarState,
}: NewJournalDialogPropTypes): ReactElement => {
    const classes = useCustomDialogStyles();

    const [journalName, setJournalName] = useState("");
    const [journalIcon, setJournalIcon] = useState("");
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

        return result;
    }, [journalName, journalIcon]);

    const handleIconChange = (e: any, newIcon: any) => {
        setJournalIcon(newIcon);
    };

    const handleChangeJournalName = (e: any) => {
        setJournalName(e.target.value);
    };

    useEffect(() => {
        if (createNewJournalState.error) {
            setSnackbarState({
                message: "Failed to create new journal",
                severity: "error",
                open: true,
            });
        }
    }, [createNewJournalState, setSnackbarState]);

    return (
        <Fragment>
            <CustomDialog
                aria-label="Create New Journal Dialog"
                open={open}
                setOpen={setOpen}
                title={"Create New Journal"}
                onSubmit={createNewJournal}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewJournalDialog);
