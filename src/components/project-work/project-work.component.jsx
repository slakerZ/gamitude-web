import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
// Components
import ProjectTimer from "../project-timer/project-timer.component.jsx";
import ProjectToggle from "../project-toggle/project-toggle.component.jsx";

const ProjectWork = ({ index }) => {
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
            <ProjectTimer index={index} />
            <ProjectToggle index={index} />
        </div>
    );
};

export default ProjectWork;
