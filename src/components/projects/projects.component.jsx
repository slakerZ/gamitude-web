import React from "react";
import { connect } from "react-redux";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// UI icons
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
// Components
import Project from "../project/project.component.jsx";
import ProjectTab from "../project-tab/project-tab.component.jsx";

const Projects = ({ projects }) => {
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

    const handleIcons = dominant => {
        switch (dominant) {
            case "strength": {
                return StrengthIcon;
            }
            case "creativity": {
                return CreativityIcon;
            }
            case "intelligence": {
                return IntelligenceIcon;
            }
            case "fluency": {
                return FluencyIcon;
            }
            default: {
                return IntelligenceIcon;
            }
        }
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
                    />
                    <Tab
                        icon={<OnHoldIcon className={classes.icons} />}
                        label="ON HOLD"
                    />
                    <Tab
                        icon={<DoneIcon className={classes.icons} />}
                        label="COMPLETE"
                    />
                </Tabs>
            </AppBar>

            {projects.map(project => {
                return (
                    <ProjectTab
                        // TODO think whether it is safe to do so
                        key={project.index}
                        value={value}
                        index={project.status}
                    >
                        <Project
                            Icon={handleIcons(project.dominant)}
                            index={projects.indexOf(project)}
                        />
                    </ProjectTab>
                );
            })}

            <Fab color="secondary" aria-label="add" className={classes.add}>
                <AddIcon />
            </Fab>
        </div>
    );
};

const mapStateToProps = state => ({
    projects: state.projects.projects,
});

export default connect(mapStateToProps)(Projects);
