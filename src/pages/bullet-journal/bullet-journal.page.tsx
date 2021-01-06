import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useAsyncFn, useEffectOnce } from "react-use";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Skeleton from "@material-ui/lab/Skeleton";

import { setPages } from "redux/bulletPages/pages.actions";
import { selectPages } from "redux/bulletPages/pages.selectors";
import { setJournals } from "redux/journals/journals.actions";
import { selectJournals } from "redux/journals/journals.selectors";
import { setProjectTasks } from "redux/projectTasks/projectTasks.actions";
import { selectProjectTasks } from "redux/projectTasks/projectTasks.selectors";
import { setProjects } from "redux/projects/projects.actions";
import { selectProjects } from "redux/projects/projects.selectors";
import { selectToken } from "redux/user/user.selectors";

import { getJournals } from "api/bulletJournal/journals.api";
import { getPages } from "api/bulletPages/pages.api";
import { getProjectTasksForPage } from "api/projectTasks/projectTasks.api";
import { getProjects } from "api/projects/projects.api";

import NewJournalDialog from "components/atoms/custom-dialog/new-journal-dialog.component";
import NewPageDialog from "components/atoms/custom-dialog/new-page-dialog.component";
import NewProjectTaskDialog from "components/atoms/custom-dialog/new-task-dialog.component";
import ToggleableTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import Page from "components/molecules/bullet-page/page.component";
import BulletTask from "components/molecules/bullet-task/task.compotent";

import Journal from "components/organisms/bullet-journal/journal.component";

import useBulletJournalStyles from "./styles";
import { BulletProps } from "./types";

const BulletJournalPage = ({
    token,
    journals,
    pages,
    projectTasks,
    setJournals,
    setPages,
    setProjectTasks,
    setProjects,
    projects,
}: BulletProps) => {
    const classes = useBulletJournalStyles();

    const [isNewJournalDialogOpen, setIsNewJournalDialogOpen] = useState(false);
    const [isNewPageDialogOpen, setIsNewPageDialogOpen] = useState(false);
    const [
        isNewProjectTaskDialogOpen,
        setIsNewProjectTaskDialogOpen,
    ] = useState(false);

    const [pagesCurrJournalIndex, setPagesCurrJournalIndex] = useState(0);
    const [tasksCurrPageIndex, setTasksCurrPageIndex] = useState(0);

    const [currJournalId, setCurrJournalId] = useState("");
    const [currPageId, setCurrPageId] = useState("");

    const [getJournalsListState, getJournalsList] = useAsyncFn(async () => {
        const response = await getJournals(token);
        const result = response.data;
        setJournals(result);
    });

    const [getPagesListState, getPagesList] = useAsyncFn(async (journalId) => {
        const response = await getPages(token, journalId);
        const result = response.data;
        setPages(result);
        return result;
    });

    const [getProjectsListState, getProjectsList] = useAsyncFn(async () => {
        const response = await getProjects(token);
        const result = response.data;
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

    useEffectOnce(() => {
        getProjectsList();
        getCurrJournalId();
        getJournalsList();
        //getPagesList(currJournalId);
        //getCurrPageId();
        //getProjectTasksList(currJournalId, currPageId);
    });

    useEffect(() => {
        getPagesList(currJournalId);
    }, [currJournalId]);

    useEffect(() => {
        getProjectTasksList(currJournalId, currPageId);
    }, [currJournalId, currPageId]);

    const getCurrJournalId = () => {
        journals.map(({ id }, index) => {
            if (index === pagesCurrJournalIndex) {
                setCurrJournalId(id);
            }
        });
    };

    const getCurrPageId = () => {
        pages.map(({ id }, index) => {
            if (index === tasksCurrPageIndex) {
                setCurrPageId(() => {
                    return id;
                });
            }
        });
    };

    const handleChangeCurrentJournal = (
        event: React.ChangeEvent<any>,
        newValue: number,
    ) => {
        setPagesCurrJournalIndex(newValue);
        setTasksCurrPageIndex(0);
        getCurrJournalId();
    };

    const handleChangeCurrentPage = (
        event: React.ChangeEvent<any>,
        newValue: number,
    ) => {
        setTasksCurrPageIndex(newValue);
        getCurrPageId();
        getCurrJournalId();
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

    return !token ? (
        <Redirect to="/signInSignUp" />
    ) : (
        <div className={classes.root}>
            {getJournalsListState.loading ? (
                <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.tabsPlaceholder}
                />
            ) : (
                <Journal
                    pagesCurrJournalIndex={pagesCurrJournalIndex}
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
            ) : (
                <Page
                    pagesCurrJournalIndex={pagesCurrJournalIndex}
                    tasksCurrPageIndex={tasksCurrPageIndex}
                    handleChangeCurrentPage={handleChangeCurrentPage}
                    handleOpenNewPageDialog={handleOpenNewPageDialog}
                />
            )}
            <div className={classes.restWrapper}>
                {projectTasks.map((projectTask, index) => {
                    return (
                        <BulletTask
                            key={projectTask.id}
                            projectTask={projectTask}
                            currJournalId={currJournalId}
                            currPageId={currPageId}
                            tasksCurrPageIndex={tasksCurrPageIndex}
                            getProjectTasksList={getProjectTasksList}
                            handleOpenNewProjectTaskDialog={
                                handleOpenNewProjectTaskDialog
                            }
                        />
                    );
                })}
                <div className={classes.fabWrapper} aria-label="Add Task">
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
                journalId={currJournalId}
            />
            <NewProjectTaskDialog
                open={isNewProjectTaskDialogOpen}
                setOpen={setIsNewProjectTaskDialogOpen}
                getProjectTasksList={getProjectTasksList}
                journalId={currJournalId}
                pageId={currPageId}
            />
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    token: selectToken(state),
    journals: selectJournals(state),
    pages: selectPages(state),
    projectTasks: selectProjectTasks(state),
    projects: selectProjects(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setJournals: (value: any) => dispatch(setJournals(value)),
    setPages: (value: any) => dispatch(setPages(value)),
    setProjectTasks: (value: any) => dispatch(setProjectTasks(value)),
    setProject: (value: any) => dispatch(setProjects(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BulletJournalPage);
