import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// Components
import ProjectHeader from "../project-header/project-header.component.jsx";
import ProjectDetails from "../project-details/project-details.component.jsx";

const Project = ({ index }) => {
    const useStyles = makeStyles({
        container: {
            backgroundColor: "transparent",
        },
    });
    const classes = useStyles();

    return (
        <ExpansionPanel square className={classes.container}>
            <ProjectHeader index={index} />
            <ProjectDetails index={index} />
        </ExpansionPanel>
    );
};

export default Project;
