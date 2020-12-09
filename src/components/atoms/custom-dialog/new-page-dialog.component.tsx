import React, { useState, Fragment, useEffect, ReactElement } from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import { postPage } from "api/bulletPages/pages.api";

import { ICONS } from "components/atoms/custom-icon/constants";
import CustomToggleButtonGroup from "components/atoms/custom-toggle-button-group/custom-toggle-button-group.component";

import CustomDialog from "./custom-dialog.component";
import useCustomDialogStyles from "./styles";
import { NewPageDialogPropTypes } from "./types";

const NewPageDialog = ({
    open,
    setOpen,
    token,
    getPagesList,
    setSnackbarState,
    journalId,
}: NewPageDialogPropTypes): ReactElement => {
    const classes = useCustomDialogStyles();

    const [pageName, setPageName] = useState("");
    const [pageIcon, setPageIcon] = useState("");
    const [fromDay, setFromDay] = useState(0);
    const [toDay, setToDay] = useState(0);

    const [createNewPageState, createNewPage] = useAsyncFn(async () => {
        const requestBody = {
            journalId: journalId,

            name: pageName,

            fromDay: fromDay,

            toDay: toDay,

            icon: pageIcon,

            description: "",

            pageType: "NORMAL",
        };
        const result = await postPage(token, requestBody);
        setOpen(false);
        getPagesList(journalId);
        // Reset
        setPageName("");
        setPageIcon("");

        return result;
    }, [pageName, pageIcon]);

    const handleIconChange = (e: any, newIcon: any) => {
        setPageIcon(newIcon);
    };

    const handleChangeJournalName = (e: any) => {
        setPageName(e.target.value);
    };

    const handleChangeJournalFromDay = (e: any) => {
        setFromDay(parseInt(e.target.value));
    };

    const handleChangeJournalToDay = (e: any) => {
        setToDay(parseInt(e.target.value));
    };

    useEffect(() => {
        if (createNewPageState.error) {
            setSnackbarState({
                message: "Failed to create new journal",
                severity: "error",
                open: true,
            });
        }
    }, [createNewPageState, setSnackbarState]);

    return (
        <Fragment>
            <CustomDialog
                aria-label="Create New Page Dialog"
                open={open}
                setOpen={setOpen}
                title={"Create New Page"}
                onSubmit={createNewPage}
            >
                <div
                    aria-label="Create New Page Dialog's Body"
                    className={classes.newFolderDialogBody}
                >
                    <TextField
                        label={"Name"}
                        variant={"outlined"}
                        fullWidth
                        value={pageName}
                        onChange={handleChangeJournalName}
                    />

                    <TextField
                        label={"fromDate"}
                        variant={"outlined"}
                        fullWidth
                        value={fromDay}
                        onChange={handleChangeJournalFromDay}
                    />
                    <TextField
                        label={"toDate"}
                        variant={"outlined"}
                        fullWidth
                        value={toDay}
                        onChange={handleChangeJournalToDay}
                    />

                    <Typography
                        variant={"h4"}
                        component={"h4"}
                        align={"center"}
                    >
                        {"Choose page's icon"}
                    </Typography>

                    <CustomToggleButtonGroup
                        value={pageIcon}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPageDialog);
