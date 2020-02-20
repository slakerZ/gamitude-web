import React from "react";
// Components
import Stats from "../../components/stats/stats.component.jsx";
import Energies from "../../components/energies/energies.component.jsx";
import Rank from "../../components/rank/rank.component.jsx";
import Projects from "../../components/projects/projects.component.jsx";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
//import "./projects.styles.scss";

const ProjectsPage = () => {
    const useStyles = makeStyles({
        projectsPage: {
            display: "grid",
            gap: "2rem",
            padding: "2rem",

            height: "90vh",

            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gridTemplateAreas: `
                "rank projects energies"
                "rank projects stats"
            `,
        },
    });

    const classes = useStyles();

    return (
        <div className={classes.projectsPage}>
            <Rank />
            <Projects />
            <Stats />
            <Energies />
        </div>
    );
};

export default ProjectsPage;
