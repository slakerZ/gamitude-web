import { CONTROL_PANEL_WIDTH } from "App/constants";

import React, { useState } from "react";
import { useSetState } from "react-use";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import FormikForm from "components/atoms/formik-form/formik-form.component";

import { taskFields, taskInitialValues, TaskSchema } from "./task-schema";

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
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}
function test(): any {
    return console.log("works");
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
}));

const Bullet = () => {
    const classes = useStyles();
    const [journalValue, setJournalValue] = useState(0);
    const [pageValue, setPageValue] = useState(0);
    const [selectedTask, setSelectedTask] = useState(100);

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
    return (
        <div className={classes.root}>
            <div className={classes.tabsWrapper}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={journalValue}
                    onChange={handleJournalChange}
                    aria-label="Bullet Journals"
                    className={classes.tabs}
                >
                    <Tab
                        label="Work"
                        icon={
                            <CustomIcon
                                variant={"bulletJournal"}
                                size="small"
                            />
                        }
                        {...a11yProps(0)}
                    />
                    <Tab
                        label="School"
                        icon={
                            <CustomIcon
                                variant={"bulletJournal"}
                                size="small"
                            />
                        }
                        {...a11yProps(1)}
                    />
                    <Tab
                        label="Workout"
                        icon={
                            <CustomIcon
                                variant={"bulletJournal"}
                                size="small"
                            />
                        }
                        {...a11yProps(2)}
                    />
                </Tabs>
            </div>
            <div className={classes.tabsWrapper}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={pageValue}
                    onChange={handlePageChange}
                    aria-label="Bullet Journals"
                    className={classes.tabs}
                >
                    <Tab
                        label="Day"
                        icon={<CustomIcon variant={"done"} size="small" />}
                        {...a11yProps(0)}
                    />
                    <Tab
                        label="Week"
                        icon={<CustomIcon variant={"done"} size="small" />}
                        {...a11yProps(1)}
                    />
                    <Tab
                        label="Scheduled Future"
                        icon={<CustomIcon variant={"done"} size="small" />}
                        {...a11yProps(2)}
                    />
                    <Tab
                        label="Unscheduled Future"
                        icon={<CustomIcon variant={"done"} size="small" />}
                        {...a11yProps(3)}
                    />
                    <Tab
                        label="Over-due"
                        icon={<CustomIcon variant={"done"} size="small" />}
                        {...a11yProps(4)}
                    />
                </Tabs>
            </div>
            <div aria-label="Tasks in Journal" className={classes.restWrapper}>
                <TabPanel value={journalValue} index={0}>
                    <TabPanel value={pageValue} index={0}>
                        <Accordion className={classes.acord}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="Task"
                                className={classes.summary}
                            >
                                <CustomIcon
                                    variant={"creativity"}
                                    size="medium"
                                />
                                <FormControlLabel
                                    aria-label="Select Task"
                                    onClick={handleSelectionChanged}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Radio />}
                                    label={"Task name"}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </TabPanel>
                    <TabPanel value={pageValue} index={1}></TabPanel>
                    <TabPanel value={pageValue} index={2}></TabPanel>
                    <TabPanel value={pageValue} index={3}></TabPanel>
                    <TabPanel value={pageValue} index={4}></TabPanel>
                </TabPanel>
                <TabPanel value={journalValue} index={1}>
                    <TabPanel value={pageValue} index={0}></TabPanel>
                    <TabPanel value={pageValue} index={1}>
                        <Accordion className={classes.acord}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="Task"
                                className={classes.summary}
                            >
                                <CustomIcon
                                    variant={"creativity"}
                                    size="medium"
                                />
                                <FormControlLabel
                                    aria-label="Select Task"
                                    onClick={handleSelectionChanged}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Radio />}
                                    label={"Task name"}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </TabPanel>
                    <TabPanel value={pageValue} index={2}></TabPanel>
                    <TabPanel value={pageValue} index={3}></TabPanel>
                    <TabPanel value={pageValue} index={4}></TabPanel>
                </TabPanel>
                <TabPanel value={journalValue} index={2}>
                    <TabPanel value={pageValue} index={0}></TabPanel>
                    <TabPanel value={pageValue} index={1}></TabPanel>
                    <TabPanel value={pageValue} index={2}></TabPanel>
                    <TabPanel value={pageValue} index={3}></TabPanel>
                    <TabPanel value={pageValue} index={4}>
                        <Accordion className={classes.acord}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="Task"
                                className={classes.summary}
                            >
                                <CustomIcon
                                    variant={"creativity"}
                                    size="medium"
                                />
                                <FormControlLabel
                                    aria-label="Select Task"
                                    onClick={handleSelectionChanged}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Radio />}
                                    label={"Task name"}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                                <FormikForm
                                    initialValues={taskInitialValues}
                                    schema={TaskSchema}
                                    fields={taskFields}
                                    onSubmit={test}
                                    state={"good"}
                                />
                            </AccordionDetails>
                        </Accordion>
                    </TabPanel>
                </TabPanel>
            </div>
        </div>
    );
};

export default Bullet;
