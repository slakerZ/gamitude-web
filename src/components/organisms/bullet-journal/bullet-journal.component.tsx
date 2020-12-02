import { CONTROL_PANEL_WIDTH } from "App/constants";

import React, { useState } from "react";
import { connect } from "react-redux";
import { useAsyncFn, useEffectOnce, useSetState } from "react-use";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
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
import { selectToken } from "redux/user/user.selectors";

import { getJournals, postJournal } from "api/bulletJournal/journals.api";
import { getPages } from "api/bulletPages/pages.api";

import NewJournalDialog from "components/atoms/custom-dialog/new-journal-dialog.component";
import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import FormikForm from "components/atoms/formik-form/formik-form.component";
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
}: BulletPropTypes) => {
    const classes = useStyles();

    const [isNewJournalDialogOpen, setIsNewJournalDialogOpen] = useState(false);
    const [pagesCurrJournalIndex, setPagesCurrJournalIndex] = useState(0);
    const [currJournalId, setCurrJournalId] = useState(
        "5fc7cae25c75a42717d866e0",
    );
    const [getPagesListState, getPagesList] = useAsyncFn(async (journalId) => {
        console.log(journalId);
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

    useEffectOnce(() => {
        getJournalsList();
        getPagesList(currJournalId);
    });

    const handleChangeCurrentJournal = (
        event: React.ChangeEvent<any>,
        newValue: number,
    ) => {
        setPagesCurrJournalIndex(newValue);
    };
    /*
    const handleChangeSelectedPage = (
        event: React.ChangeEvent<any>,
        newValue: any,
    ) => {
        setTasksCurrPageIndex(newValue);
    };
    
    const handleOpenNewPageDialog = () => {
        setIsNewPageFormOpen(true);
    };
*/

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
            <NewJournalDialog
                open={isNewJournalDialogOpen}
                setOpen={setIsNewJournalDialogOpen}
                getJournalsList={getJournalsList}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Bullet);
