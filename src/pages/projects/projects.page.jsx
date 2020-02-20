import React from "react";
// Components
import Stats from "../../components/stats/stats.component.jsx";
import Energies from "../../components/energies/energies.component.jsx";
import Rank from "../../components/rank/rank.component.jsx";
import Projects from "../../components/projects/projects.component.jsx";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Styles
import "./projects.styles.scss";

const ProjectsPage = () => {
    const useStyles = makeStyles({
        projectsPage: {
            gridArea: "projects",
            boxShadow: "2px 2px 10px #000000",
            backgroundColor: "transparent",
        },
    });

    const classes = useStyles();

    return (
        <div className={`projects-page ${classes.projectsPage}`}>
            <Rank />
            <Projects />
            <Stats />
            <Energies />
        </div>
    );
};

export default ProjectsPage;
