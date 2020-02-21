import React from "react";
import { connect } from "react-redux";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
// Components
import CustomIcon from "../../components/custom-icon/custom-icon.component.jsx";
import ProjectTab from "../../components/project-tab/project-tab.component.jsx";
import Stats from "../../components/stats/stats.component.jsx";
import Energies from "../../components/energies/energies.component.jsx";
import Rank from "../../components/rank/rank.component.jsx";
import Projects from "../../components/projects/projects.component.jsx";
// Selectors
import {
    selectSessionInProgress,
    selectBreakInProgress,
} from "../../redux/projects/projects.selectors";

const ProjectsMobilePage = ({ sessionInProgress, breakInProgress }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const useStyles = makeStyles(theme => ({
        center: {
            width: "100%",
            height: "100%",
            overflow: "auto",
        },
        root: {
            flexGrow: 1,
            backgroundColor: "transparent",
            boxShadow: "5px 5px 10px #000000",
            overflow: "auto",
        },
        appBar: {
            backgroundColor: "transparent",
            top: "auto",
            bottom: "0",
        },
        tabs: {
            backgroundColor: theme.palette.secondary.dark,
            justifyContent: "center",
        },
        toolbar: {
            height: "25vh",
        },
    }));
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.center}>
                <ProjectTab value={value} currTab={0}>
                    <Rank />
                </ProjectTab>
                <ProjectTab value={value} currTab={1}>
                    <Stats />
                    <Energies />
                </ProjectTab>
                <ProjectTab value={value} currTab={2}>
                    <Projects />
                </ProjectTab>

                <Toolbar className={classes.toolbar} />
            </div>
            <AppBar position="fixed" className={classes.appBar}>
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
                        icon={<CustomIcon variant="Logo" size="medium" />}
                        label="RANK"
                        disabled={sessionInProgress || breakInProgress}
                    />
                    <Tab
                        icon={<CustomIcon variant="Logo" size="medium" />}
                        label="STATS"
                        disabled={sessionInProgress || breakInProgress}
                    />
                    <Tab
                        icon={<CustomIcon variant="Logo" size="medium" />}
                        label="PROJECTS"
                        disabled={sessionInProgress || breakInProgress}
                    />
                </Tabs>
            </AppBar>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    breakInProgress: selectBreakInProgress(state),
    sessionInProgress: selectSessionInProgress(state),
});
export default connect(mapStateToProps)(ProjectsMobilePage);
