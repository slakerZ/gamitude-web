import { CONTROL_PANEL_WIDTH } from "App/constants";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useAsyncFn, useEffectOnce, useSetState } from "react-use";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Skeleton from "@material-ui/lab/Skeleton";

import { setPages } from "redux/bulletPages/pages.actions";
import { selectPages } from "redux/bulletPages/pages.selectors";
import { setJournals } from "redux/journals/journals.actions";
import { selectJournals } from "redux/journals/journals.selectors";
import { setProjectTasks } from "redux/projectTasks/projectTasks.actions";
import { selectToken } from "redux/user/user.selectors";

import { getJournals, postJournal } from "api/bulletJournal/journals.api";
import { getPages } from "api/bulletPages/pages.api";
import { getAllProjectTasks } from "api/projectTasks/projectTasks.api";

import NewJournalDialog from "components/atoms/custom-dialog/new-journal-dialog.component";
import NewPageDialog from "components/atoms/custom-dialog/new-page-dialog.component";
import NewProjectTaskDialog from "components/atoms/custom-dialog/new-task-dialog.component";
import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import FormikForm from "components/atoms/formik-form/formik-form.component";
import { TabPanel } from "components/atoms/tab-panel/tab-panel.component";
import ToggleableTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import { taskFields, taskInitialValues, TaskSchema } from "./task-schema";
import { BulletPropTypes } from "./types";

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        width: "100%",
        height: "100%",
        overflowX: "hidden",
    },
    tabs: {
        backgroundColor: theme.palette.primary.dark,
        justifyContent: "center",
        borderRight: `1px solid ${theme.palette.divider}`,
        height: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        padding: "10px",
    },
    tabsWrapper: {
        backgroundColor: theme.palette.primary.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    restWrapper: {
        width: "100%",
    },
    fabWrapper: {
        position: "fixed",
        bottom: 0,
        right: `${CONTROL_PANEL_WIDTH}vw`,
        padding: theme.spacing(1.5),
    },
    add: {
        boxShadow: "5px 5px 10px #000000",
        backgroundColor: theme.palette.secondary.main,
    },
    tabsPlaceholder: {
        width: "161px",
        height: "877px",
    },
}));

const Bullet = ({
    token,
    setJournals,
    journals,
    pages,
    setPages,
    setProjectTasks,
}: BulletPropTypes) => {
    const classes = useStyles();

    const [isNewJournalDialogOpen, setIsNewJournalDialogOpen] = useState(false);
    const [isNewPageDialogOpen, setIsNewPageDialogOpen] = useState(false);
    const [pagesCurrJournalIndex, setPagesCurrJournalIndex] = useState(0);
    const [tasksCurrPageIndex, setTasksCurrPageIndex] = useState(0);

    const [currJournalId, setCurrJournalId] = useState(
        "5fd0c3c1887b73b7450fb768",
    );
    const [getPagesListState, getPagesList] = useAsyncFn(async (journalId) => {
        const response = await getPages(token, journalId);
        const result = response.data;
        setPages(result);
        return result;
    });

    const [getJournalsListState, getJournalsList] = useAsyncFn(async () => {
        const response = await getJournals(token);
        const result = response.data;
        setJournals(result);
    });

    const [getProjectTasksListState, getProjectTasksList] = useAsyncFn(
        async () => {
            const response = await getAllProjectTasks(token);
            const result = response.data;
            setProjectTasks(result);
        },
    );

    useEffectOnce(() => {
        getJournalsList();
        getProjectTasksList();
        getCurrJournalId();
        getPagesList(currJournalId);
    });

    const getCurrJournalId = () => {
        journals.map(({ id }, index) => {
            if (index === pagesCurrJournalIndex) {
                setCurrJournalId(id);
            }
        });
    };

    useEffect(() => {
        getPagesList(currJournalId);
    }, [currJournalId]);

    const handleChangeCurrentJournal = (
        event: React.ChangeEvent<any>,
        newValue: number,
    ) => {
        setPagesCurrJournalIndex(newValue);
        getCurrJournalId();
        setTasksCurrPageIndex(0);
    };

    const handleChangeCurrentPage = (
        event: React.ChangeEvent<any>,
        newValue: any,
    ) => {
        setTasksCurrPageIndex(newValue);
    };

    const handleOpenNewPageDialog = () => {
        setIsNewPageDialogOpen(true);
    };

    const handleOpenNewJournalDialog = () => {
        setIsNewJournalDialogOpen(true);
    };

    return (
        <div className={classes.root}>
            {getJournalsListState.loading ? (
                <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.tabsPlaceholder}
                />
            ) : (
                <div className={classes.tabsWrapper}>
                    <Tabs
                        aria-label="Journals navigation"
                        orientation="vertical"
                        variant="scrollable"
                        value={pagesCurrJournalIndex}
                        onChange={handleChangeCurrentJournal}
                        className={classes.tabs}
                    >
                        {journals.map(({ name, icon }, index) => {
                            return (
                                <Tab
                                    key={index}
                                    label={name}
                                    {...a11yProps(index)}
                                    icon={
                                        <CustomIcon
                                            variant={icon}
                                            size="small"
                                        />
                                    }
                                />
                            );
                        })}
                    </Tabs>
                    <ToggleableTooltip target="journal">
                        <IconButton
                            aria-label="Add journal"
                            color="primary"
                            onClick={handleOpenNewJournalDialog}
                        >
                            <AddIcon />
                        </IconButton>
                    </ToggleableTooltip>
                </div>
            )}
            {getPagesListState.loading ? (
                <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.tabsPlaceholder}
                />
            ) : (
                <div
                    aria-label="Pages in current Journal"
                    className={classes.tabsWrapper}
                >
                    <TabPanel
                        value={pagesCurrJournalIndex}
                        index={pagesCurrJournalIndex}
                        role={"journal"}
                        id={"pages-in-journal"}
                    >
                        <div className={classes.tabsWrapper}>
                            <Tabs
                                aria-label="Page navigation"
                                orientation="vertical"
                                variant="scrollable"
                                value={tasksCurrPageIndex}
                                onChange={handleChangeCurrentPage}
                                className={classes.tabs}
                            >
                                {pages.map(({ name, icon }, index) => {
                                    return (
                                        <Tab
                                            key={index}
                                            label={name}
                                            {...a11yProps(index)}
                                            icon={
                                                <CustomIcon
                                                    variant={icon}
                                                    size="small"
                                                />
                                            }
                                        />
                                    );
                                })}
                            </Tabs>
                            <ToggleableTooltip target="page">
                                <IconButton
                                    aria-label="Add page"
                                    color="primary"
                                    onClick={handleOpenNewPageDialog}
                                >
                                    <AddIcon />
                                </IconButton>
                            </ToggleableTooltip>
                        </div>
                    </TabPanel>
                </div>
            )}
            <NewJournalDialog
                open={isNewJournalDialogOpen}
                setOpen={setIsNewJournalDialogOpen}
                getJournalsList={getJournalsList}
            />
            <NewPageDialog
                open={isNewPageDialogOpen}
                setOpen={setIsNewPageDialogOpen}
                getPagesList={getPagesList}
                journalId={currJournalId}
            />
            <NewProjectTaskDialog
                open={isNewJournalDialogOpen}
                setOpen={setIsNewJournalDialogOpen}
                getProjectTasksList={getProjectTasksList}
                journalId={currJournalId}
            />
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    token: selectToken(state),
    journals: selectJournals(state),
    pages: selectPages(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setJournals: (value: any) => dispatch(setJournals(value)),
    setPages: (value: any) => dispatch(setPages(value)),
    setProjectTasks: (value: any) => dispatch(setProjectTasks(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bullet);