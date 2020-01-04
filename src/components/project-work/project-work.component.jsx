import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
// Components
import ProjectTimer from "../project-timer/project-timer.component.jsx";
import ToggleButtons from "../projects-toggle/projects-toggle.component.jsx";

const ProjectWork = () => {
    const useStyles = makeStyles({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
    });
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <ProjectTimer time={25} />
            <ToggleButtons />
        </div>
    );
};

export default ProjectWork;
