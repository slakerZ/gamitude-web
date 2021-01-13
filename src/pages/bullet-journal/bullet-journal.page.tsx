import React, { Fragment, useState } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useAsyncFn, useEffectOnce } from "react-use";

import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Skeleton from "@material-ui/lab/Skeleton";

import { setPages } from "redux/bulletPages/pages.actions";
import { setJournals } from "redux/journals/journals.actions";
import { setProjectTasks } from "redux/projectTasks/projectTasks.actions";
import { selectProjectTasks } from "redux/projectTasks/projectTasks.selectors";
import { setProjects } from "redux/projects/projects.actions";
import { selectToken } from "redux/user/user.selectors";

import { getJournals } from "api/bulletJournal/journals.api";
import { getPages } from "api/bulletPages/pages.api";
import { getProjectTasksForPage } from "api/projectTasks/projectTasks.api";
import { getProjects } from "api/projects/projects.api";

import ToggleableTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import Page from "components/molecules/bullet-page/page.component";
import BulletTask from "components/molecules/bullet-task/task.compotent";
import NewJournalDialog from "components/molecules/custom-dialog/new-journal-dialog.component";
import NewPageDialog from "components/molecules/custom-dialog/new-page-dialog.component";
import NewProjectTaskDialog from "components/molecules/custom-dialog/new-task-dialog.component";

import Journal from "components/organisms/bullet-journal/journal.component";

import useBulletJournalStyles from "./styles";
import { BulletProps } from "./types";

const BulletJournalPage = ({
    token,
    projectTasks,
    setJournals,
    setPages,
    setProjectTasks,
    setProjects,
}: BulletProps) => {
    const classes = useBulletJournalStyles();

    //useState
    const [isNewJournalDialogOpen, setIsNewJournalDialogOpen] = useState(false);
    const [isNewPageDialogOpen, setIsNewPageDialogOpen] = useState(false);
    const [
        isNewProjectTaskDialogOpen,
        setIsNewProjectTaskDialogOpen,
    ] = useState(false);

    const [pagesCurrJournalId, setPagesCurrJournalId] = useState<
        boolean | string
    >(false);
    const [tasksCurrPageId, setTasksCurrPageId] = useState<boolean | string>(
        false,
    );
    const [selectedProjectTask, setSelectedProjectTask] = useState("");

    //useAsync
    const [getJournalsListState, getJournalsList] = useAsyncFn(async () => {
        const response = await getJournals(token);
        const result = await response.data;
        setJournals(result);
        return result;
    });

    const [getPagesListState, getPagesList] = useAsyncFn(async (journalId) => {
        const response = await getPages(token, journalId);
        const result = await response.data;
        setPages(result);
        return result;
    });

    const [getProjectsListState, getProjectsList] = useAsyncFn(async () => {
        const response = await getProjects(token);
        const result = await response.data;
        setProjects(result);
        return result;
    });

    const [getProjectTasksListState, getProjectTasksList] = useAsyncFn(
        async (journalId, pageId) => {
            const response = await getProjectTasksForPage(
                token,
                journalId,
                pageId,
            );
            const result = response.data;
            setProjectTasks(result);
        },
    );

    //handlers
    const handleChangeCurrentJournal = (
        event: React.ChangeEvent<any>,
        newValue: string,
    ) => {
        setPagesCurrJournalId(newValue);
        getPagesList(newValue);
        setTasksCurrPageId(false);
    };

    const handleChangeCurrentPage = (
        event: React.ChangeEvent<any>,
        newValue: string,
    ) => {
        setTasksCurrPageId(newValue);
        getProjectTasksList(pagesCurrJournalId, newValue);
    };

    const handleOpenNewPageDialog = () => {
        setIsNewPageDialogOpen(true);
    };

    const handleOpenNewJournalDialog = () => {
        setIsNewJournalDialogOpen(true);
    };

    const handleOpenNewProjectTaskDialog = () => {
        setIsNewProjectTaskDialogOpen(true);
    };

    //useEffect
    useEffectOnce(() => {
        getProjectsList();
        getJournalsList();
    });

    return !token ? (
        <Redirect to="/signInSignUp" />
    ) : (
        <Fragment>
            <Helmet>
                <title>{"Gamitude | Bullet Journal"}</title>
            </Helmet>
            <div className={classes.root}>
                {getJournalsListState.loading ||
                getProjectsListState.loading ? (
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        className={classes.tabsPlaceholder}
                    />
                ) : (
                    <Journal
                        pagesCurrJournalIndex={pagesCurrJournalId}
                        handleChangeCurrentJournal={handleChangeCurrentJournal}
                        handleOpenNewJournalDialog={handleOpenNewJournalDialog}
                    />
                )}
                {getPagesListState.loading ? (
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        className={classes.tabsPlaceholder}
                    />
                ) : pagesCurrJournalId !== false ? (
                    <Page
                        pagesCurrJournalIndex={pagesCurrJournalId}
                        tasksCurrPageIndex={tasksCurrPageId}
                        handleChangeCurrentPage={handleChangeCurrentPage}
                        handleOpenNewPageDialog={handleOpenNewPageDialog}
                    />
                ) : null}
                <div className={classes.restWrapper}>
                    {getProjectTasksListState.loading ? (
                        <div className={classes.center}>
                            <CircularProgress />
                        </div>
                    ) : tasksCurrPageId !== false ? (
                        projectTasks.map((projectTask) => {
                            return (
                                <BulletTask
                                    key={projectTask.id}
                                    projectTask={projectTask}
                                    currJournalId={pagesCurrJournalId as string}
                                    currPageId={tasksCurrPageId as string}
                                    tasksCurrPageIndex={tasksCurrPageId}
                                    getProjectTasksList={getProjectTasksList}
                                    setSelectedProjectTask={
                                        setSelectedProjectTask
                                    }
                                    selectedProjectTask={selectedProjectTask}
                                />
                            );
                        })
                    ) : null}
                    {tasksCurrPageId !== false ? (
                        <div
                            className={classes.fabWrapper}
                            aria-label="Add Task"
                        >
                            <ToggleableTooltip target="Task">
                                <Fab
                                    color="secondary"
                                    aria-label="add"
                                    className={classes.add}
                                    onClick={handleOpenNewProjectTaskDialog}
                                >
                                    <AddIcon />
                                </Fab>
                            </ToggleableTooltip>
                        </div>
                    ) : null}
                </div>
                <NewJournalDialog
                    open={isNewJournalDialogOpen}
                    setOpen={setIsNewJournalDialogOpen}
                    getJournalsList={getJournalsList}
                />
                <NewPageDialog
                    open={isNewPageDialogOpen}
                    setOpen={setIsNewPageDialogOpen}
                    getPagesList={getPagesList}
                    journalId={pagesCurrJournalId as string}
                />
                <NewProjectTaskDialog
                    open={isNewProjectTaskDialogOpen}
                    setOpen={setIsNewProjectTaskDialogOpen}
                    getProjectTasksList={getProjectTasksList}
                    journalId={pagesCurrJournalId as string}
                    pageId={tasksCurrPageId as string}
                />
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    token: selectToken(state),
    projectTasks: selectProjectTasks(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setJournals: (value: any) => dispatch(setJournals(value)),
    setPages: (value: any) => dispatch(setPages(value)),
    setProjectTasks: (value: any) => dispatch(setProjectTasks(value)),
    setProjects: (value: any) => dispatch(setProjects(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BulletJournalPage);
