import React from "react";
import { connect } from "react-redux";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
// Components
import CustomIcon from "../../components/atoms/custom-icon/custom-icon.component";
import MuiTab from "../../components/atoms/mui-tab/mui-tab.component";
import Stats from "../../components/molecules/stats/stats.component";
// import Energies from "../../components/molecules/energies/energies.component";
import Rank from "../../components/organisms/rank/rank.component";
import Projects from "../../components/molecules/projects/projects.component";
// Selectors
import {
    selectSessionInProgress,
    selectBreakInProgress,
} from "../../redux/session/session.selectors";

const ProjectsMobilePage = ({
    sessionInProgress,
    breakInProgress,
}: {
    sessionInProgress: any;
    breakInProgress: any;
}) => {
    const useStyles = makeStyles((theme) => ({
        container: {
            width: "100%",
            height: "100%",
            overflow: "auto",
            padding: "25px",
        },
        center: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
            backgroundColor: theme.palette.primary.main,
            justifyContent: "center",
        },
        toolbar: {
            height: "25vh",
        },
        stats: {
            justifyContent: "space-between",
        },
    }));
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <div className={classes.container}>
            <MuiTab value={value} currTab={0}>
                <div className={classes.center}>
                    <Rank />
                    <Toolbar className={classes.toolbar} />
                </div>
            </MuiTab>
            <MuiTab value={value} currTab={1}>
                <Stats />
                {/* <Energies /> */}
                <Toolbar className={classes.toolbar} />
            </MuiTab>
            <MuiTab value={value} currTab={2}>
                <Projects />
                <Toolbar className={classes.toolbar} />
            </MuiTab>

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
                        icon={<CustomIcon variant="rankNav" size="medium" />}
                        label="RANK"
                        disabled={sessionInProgress || breakInProgress}
                    />
                    <Tab
                        icon={<CustomIcon variant="statsNav" size="medium" />}
                        label="STATS"
                        disabled={sessionInProgress || breakInProgress}
                    />
                    <Tab
                        icon={
                            <CustomIcon variant="projectsNav" size="medium" />
                        }
                        label="PROJECTS"
                        disabled={sessionInProgress || breakInProgress}
                    />
                </Tabs>
            </AppBar>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    breakInProgress: selectBreakInProgress(state),
    sessionInProgress: selectSessionInProgress(state),
});
export default connect(mapStateToProps)(ProjectsMobilePage);
