import React from "react";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AddIcon from "@material-ui/icons/Add";

import { setPages } from "redux/bulletPages/pages.actions";
import { selectPages } from "redux/bulletPages/pages.selectors";
import { setJournals } from "redux/journals/journals.actions";
import { selectJournals } from "redux/journals/journals.selectors";
import { setProjectTasks } from "redux/projectTasks/projectTasks.actions";
import { selectProjectTasks } from "redux/projectTasks/projectTasks.selectors";
import { setProjects } from "redux/projects/projects.actions";
import { selectProjects } from "redux/projects/projects.selectors";
import { selectToken } from "redux/user/user.selectors";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import { a11yProps } from "components/atoms/tab-panel/tab-panel.component";
import ToggleableTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import useJournalStyles from "./styles";
import { JournalPropTypes } from "./types";

const Journal = ({
    journals,
    pagesCurrJournalIndex,
    handleChangeCurrentJournal,
    handleOpenNewJournalDialog,
}: JournalPropTypes) => {
    const classes = useJournalStyles();

    return (
        <div className={classes.tabsWrapper}>
            <Tabs
                aria-label="Journals navigation"
                orientation="vertical"
                variant="scrollable"
                value={pagesCurrJournalIndex}
                onChange={handleChangeCurrentJournal}
                className={classes.tabs}
            >
                {journals.map(({ id, name, icon }) => {
                    return (
                        <Tab
                            key={id}
                            label={name}
                            value={id}
                            {...a11yProps(id, "journals-with-pages")}
                            icon={<CustomIcon variant={icon} size="small" />}
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
    setProjects: (value: any) => dispatch(setProjects(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
