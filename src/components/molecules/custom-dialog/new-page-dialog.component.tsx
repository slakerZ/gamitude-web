import React, { useState, Fragment, useEffect, ReactElement } from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { selectPages } from "redux/bulletPages/pages.selectors";
import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import {
    deletePageById,
    postPage,
    putPageById,
} from "api/bulletPages/pages.api";
import { PageType } from "api/bulletPages/types";

import { ICONS } from "components/atoms/custom-icon/constants";
import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import CustomToggleButtonGroup from "components/atoms/custom-toggle-button-group/custom-toggle-button-group.component";
import {
    a11yProps,
    TabPanel,
} from "components/atoms/tab-panel/tab-panel.component";

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
    pages,
}: NewPageDialogPropTypes): ReactElement => {
    const classes = useCustomDialogStyles();

    //useState
    const [settingsPageTab, setSettingsPageTab] = useState("newPage");
    const [pageName, setPageName] = useState("");
    const [pageIcon, setPageIcon] = useState("");
    const [fromDay, setFromDay] = useState("");
    const [toDay, setToDay] = useState("");

    const [currPageId, setCurrPageId] = useState(
        pages[0] ? pages[0].id : false,
    );
    const [currPageName, setCurrPageName] = useState(
        pages[0] ? pages[0].name : "",
    );
    const [currPageIcon, setCurrPageIcon] = useState(
        pages[0] ? pages[0].icon : "",
    );
    const [currPageFromDay, setCurrPageFromDay] = useState(
        pages[0] && pages[0].fromDay !== null && pages[0].fromDay !== undefined
            ? pages[0].fromDay
            : "",
    );
    const [currPageToDay, setCurrPageToDay] = useState(
        pages[0] && pages[0].toDay !== null && pages[0].toDay !== undefined
            ? pages[0].toDay
            : "",
    );

    //useAsync
    const [createNewPageState, createNewPage] = useAsyncFn(async () => {
        const requestBody =
            fromDay !== "" || toDay !== ""
                ? {
                      journalId: journalId,

                      name: pageName,

                      beetwenDays: {
                          fromDay: parseInt(fromDay),

                          toDay: parseInt(toDay),
                      },

                      icon: pageIcon,

                      description: "",

                      pageType: "NORMAL",
                  }
                : {
                      journalId: journalId,

                      name: pageName,

                      beetwenDays: null,

                      icon: pageIcon,

                      description: "",

                      pageType: "UNSCHEDULED",
                  };
        const result = await postPage(token, requestBody);
        setOpen(false);
        getPagesList(journalId);
        // Reset
        setPageName("");
        setPageIcon("");
        setFromDay("");
        setToDay("");

        return result;
    }, [pageName, pageIcon, fromDay, toDay]);

    const [editPageState, editPage] = useAsyncFn(async () => {
        const requestBody = {
            journalId: journalId,

            name: currPageName,

            beetwenDays: {
                fromDay: parseInt(currPageFromDay),

                toDay: parseInt(currPageToDay),
            },

            icon: currPageIcon,

            description: "",

            pageType: "NORMAL",
        };
        const result = await putPageById(token, requestBody, `${currPageId}`);
        getPagesList(journalId);
        return result;
    }, [
        journalId,
        currPageId,
        currPageName,
        currPageIcon,
        currPageFromDay,
        currPageToDay,
    ]);

    const [deletePageState, deletePage] = useAsyncFn(async () => {
        const result = await deletePageById(token, `${currPageId}`);
        getPagesList(journalId);
        if (pages.length <= 1) {
            setSettingsPageTab("newPage");
        }
        setCurrPageId(false);
        setCurrPageIcon("");
        setCurrPageName("");
        setCurrPageFromDay("");
        setCurrPageToDay("");

        return result;
    }, [currPageId, pages]);

    //handlers
    const handleChangeCurrentPage = (e: any, newId: string) => {
        const currPage =
            pages.find((page: PageType) => page.id === newId) || pages[0];
        setCurrPageId(newId);
        setCurrPageName(currPage.name);
        setCurrPageIcon(currPage.icon);

        if (currPage.beetwenDays !== null) {
            setCurrPageFromDay(currPage.beetwenDays.fromDay);
            setCurrPageToDay(currPage.beetwenDays.toDay);
        } else {
            setCurrPageFromDay("");
            setCurrPageToDay("");
        }
    };

    const handleSettingsPageTabChange = (e: any, newValue: string) => {
        setSettingsPageTab(newValue);
    };

    const handleChangeCurrPageName = (e: any) => {
        setCurrPageName(e.target.value);
    };

    const handleChangeCurrPageIcon = (e: any, newIcon: string) => {
        setCurrPageIcon(newIcon);
    };

    const handleChangeCurrPageFromDay = (e: any) => {
        setCurrPageFromDay(e.target.value);
    };
    const handleChangeCurrPageToDay = (e: any) => {
        setCurrPageToDay(e.target.value);
    };

    const handleIconChange = (e: any, newIcon: string) => {
        setPageIcon(newIcon);
    };

    const handleChangeJournalName = (e: any) => {
        setPageName(e.target.value);
    };

    const handleChangeJournalFromDay = (e: any) => {
        setFromDay(e.target.value);
    };

    const handleChangeJournalToDay = (e: any) => {
        setToDay(e.target.value);
    };

    //useEfects
    useEffect(() => {
        if (createNewPageState.error) {
            setSnackbarState({
                message: "Failed to create new page",
                severity: "error",
                open: true,
            });
        }
    }, [createNewPageState, setSnackbarState]);

    useEffect(() => {
        if (editPageState.error) {
            setSnackbarState({
                message: "Failed to edit page",
                severity: "error",
                open: true,
            });
        }
    }, [editPageState, setSnackbarState]);

    useEffect(() => {
        if (deletePageState.error) {
            setSnackbarState({
                message: "Failed to delete page",
                severity: "error",
                open: true,
            });
        }
    }, [deletePageState, setSnackbarState]);

    return (
        <Fragment>
            <CustomDialog
                aria-label="Create New Page Dialog"
                open={open}
                setOpen={setOpen}
                title={"Create New Page"}
                onSubmit={
                    settingsPageTab === "newPage" ? createNewPage : editPage
                }
            >
                <Tabs
                    value={settingsPageTab}
                    onChange={handleSettingsPageTabChange}
                    variant="fullWidth"
                    aria-label="Page settings tabs"
                    className={classes.navTabs}
                >
                    <Tab
                        label={"Create new page"}
                        value={"newPage"}
                        // {...a11yProps(0, "newJournal")}
                    />
                    <Tab
                        label={"Edit pages"}
                        value={"editPages"}
                        // {...a11yProps(0, "editJournals")}
                        disabled={pages.length <= 0}
                    />
                </Tabs>
                <TabPanel
                    value={settingsPageTab}
                    index={"newPage"}
                    id="newPage"
                    role="directory"
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
                </TabPanel>
                <TabPanel
                    value={settingsPageTab}
                    index={"editPages"}
                    id="editPages"
                    role="directory"
                >
                    <Grid container>
                        <Grid item xs={4}>
                            <Tabs
                                selectionFollowsFocus
                                aria-label="Journals navigation"
                                orientation="vertical"
                                variant="scrollable"
                                value={currPageId}
                                onChange={handleChangeCurrentPage}
                                className={classes.editTimerTabs}
                            >
                                {pages.map((page: PageType, index: number) => {
                                    return (
                                        <Tab
                                            key={index}
                                            label={page.name}
                                            {...a11yProps(
                                                index,
                                                "page-with-tasks",
                                            )}
                                            icon={
                                                <CustomIcon
                                                    variant={page.icon}
                                                    size="small"
                                                />
                                            }
                                            value={page.id}
                                        />
                                    );
                                })}
                            </Tabs>
                            <div className={classes.delButtonWrapper}>
                                <Button
                                    onClick={deletePage}
                                    className={classes.delButton}
                                >
                                    <Typography
                                        variant={"h5"}
                                        component={"h5"}
                                        className={classes.delButtonTypo}
                                    >
                                        {"Delete Page"}
                                    </Typography>
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            {currPageId ? (
                                <Box p={2}>
                                    <TextField
                                        label={"Name"}
                                        variant={"outlined"}
                                        fullWidth
                                        value={currPageName}
                                        onChange={handleChangeCurrPageName}
                                    />

                                    <TextField
                                        label={"fromDate"}
                                        variant={"outlined"}
                                        fullWidth
                                        value={currPageFromDay}
                                        onChange={handleChangeCurrPageFromDay}
                                    />
                                    <TextField
                                        label={"toDate"}
                                        variant={"outlined"}
                                        fullWidth
                                        value={currPageToDay}
                                        onChange={handleChangeCurrPageToDay}
                                    />

                                    <Typography
                                        variant={"h4"}
                                        component={"h4"}
                                        align={"center"}
                                    >
                                        {"Choose page's icon"}
                                    </Typography>

                                    <CustomToggleButtonGroup
                                        value={currPageIcon}
                                        handleChange={handleChangeCurrPageIcon}
                                        items={ICONS}
                                        exclusive={true}
                                    />
                                </Box>
                            ) : (
                                <Fragment>
                                    <Typography
                                        variant={"h2"}
                                        component={"h2"}
                                        align={"center"}
                                    >
                                        {"<- Select page to edit / delete"}
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
    pages: selectPages(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPageDialog);
