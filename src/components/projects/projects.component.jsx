import React from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

// SVG's
import { ReactComponent as ActiveIcon } from "../../assets/icons/projects/active.svg";
import { ReactComponent as OnHoldIcon } from "../../assets/icons/projects/onHold.svg";
import { ReactComponent as DoneIcon } from "../../assets/icons/projects/done.svg";
import { ReactComponent as StrengthIcon } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as CreativityIcon } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as IntelligenceIcon } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as FluencyIcon } from "../../assets/icons/stats/fluency.svg";

import Project from "../project/project.component.jsx";

const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={0}>{children}</Box>}
        </Typography>
    );
};
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = index => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
};

const Projects = () => {
    const useStyles = makeStyles({
        root: {
            flexGrow: 1,
            backgroundColor: "transparent",
            gridArea: "projects",
            boxShadow: "5px 5px 10px #000000",
            position: "relative",
            overflow: "auto",
        },
        appBar: {
            backgroundColor: "transparent",
        },
        tabs: {
            backgroundColor: "rgba(196, 195, 81, 0.8)",
        },
        icons: {
            height: "4vh",
            width: "4vh",
        },
        add: {
            position: "absolute",
            right: "2%",
            bottom: "2%",
            boxShadow: "5px 5px 10px #000000",
            backgroundColor: "rgba(196, 195, 81, 0.8)",
        },
    });
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="simple tabs example"
                    className={classes.tabs}
                >
                    <Tab
                        icon={<ActiveIcon className={classes.icons} />}
                        label="ACTIVE"
                        {...a11yProps(0)}
                    />
                    <Tab
                        icon={<OnHoldIcon className={classes.icons} />}
                        label="ON HOLD"
                        {...a11yProps(1)}
                    />
                    <Tab
                        icon={<DoneIcon className={classes.icons} />}
                        label="COMPLETE"
                        {...a11yProps(2)}
                    />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} className={classes.tabPanel}>
                <Project title="React" Icon={IntelligenceIcon} />
            </TabPanel>
            <TabPanel value={value} index={0}>
                <Project title="Python" Icon={IntelligenceIcon} />
            </TabPanel>
            <TabPanel value={value} index={0}>
                <Project title="UX Design" Icon={CreativityIcon} />
            </TabPanel>
            <TabPanel value={value} index={0}>
                <Project title="HIIT" Icon={StrengthIcon} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Project title="Spanish" Icon={FluencyIcon} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Project title="English" Icon={FluencyIcon} />
            </TabPanel>

            <Fab color="secondary" aria-label="add" className={classes.add}>
                <AddIcon />
            </Fab>
        </div>
    );
};

export default Projects;
