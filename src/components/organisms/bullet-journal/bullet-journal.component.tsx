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

import { setJournals } from "redux/journals/journals.actions";
import { selectJournals } from "redux/journals/journals.selectors";
import { selectToken } from "redux/user/user.selectors";

import { getJournals, postJournal } from "api/bulletJournal/journals.api";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import FormikForm from "components/atoms/formik-form/formik-form.component";
import ToggleableTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import { taskFields, taskInitialValues, TaskSchema } from "./task-schema";
import { BulletPropTypes } from "./types";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

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
        backgroundColor: theme.palette.secondary.main,
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
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        height: "100%",
    },
    restWrapper: {
        width: "100%",
    },
    acord: {
        backgroundColor: theme.palette.primary.light,
    },
    summary: {
        backgroundColor: theme.palette.primary.light,
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

const Bullet = ({ token, setJournals, journals }: BulletPropTypes) => {
    const classes = useStyles();
    const [journalValue, setJournalValue] = useState(0);
    const [pageValue, setPageValue] = useState(0);
    const [selectedTask, setSelectedTask] = useState(100);
    const [taskName, setTaskName] = useState("Task Name");

    //const [isNewPageFormOpen, setIsNewPageFormOpen] = useState(false);
    const [pagesCurrJournalIndex, setPagesCurrJournalIndex] = useState(0);
    const [createNewJournalState, createNewJournal] = useAsyncFn(async () => {
        const requestBody = {
            projectId: "34125134352354",

            name: "new Journal",

            icon: "bulletjournal",

            description: "ewefsfsfsd",
        };
        const result = await postJournal(token, requestBody);
        getJournalsList();

        return result;
    });
    /*
    const [getPagesListState, getPagesList] = useAsyncFn(async () => {
        const response = await getPages(token);
        const result = response.data;
        setPages(result);
        return result;
    });
    */

    const [getJournalsListState, getJournalsList] = useAsyncFn(async () => {
        const response = await getJournals(token);
        const result = response.data;
        setJournals(result);
    });

    const handleJournalChange = (event: any, newValue: number) => {
        setJournalValue(newValue);
        setPageValue(0);
    };

    const handlePageChange = (event: any, newValue: number) => {
        setPageValue(newValue);
    };

    const handleSelectionChanged = (event: any) => {
        event.stopPropagation();
        setSelectedTask(0);
    };

    const test = (event: any) => {
        setTaskName("React");
    };

    useEffectOnce(() => {
        getJournalsList();
        //getPagesList();
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
        createNewJournal();
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
                        aria-label="Folders navigation"
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
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    token: selectToken(state),
    journals: selectJournals(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setJournals: (value: any) => dispatch(setJournals(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bullet);
