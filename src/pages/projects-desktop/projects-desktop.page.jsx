import React from "react";
// Components
import Stats from "../../components/stats/stats.component.jsx";
import Energies from "../../components/energies/energies.component.jsx";
import Rank from "../../components/rank/rank.component.jsx";
import Projects from "../../components/projects/projects.component.jsx";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
//import "./projects.styles.scss";

const ProjectsDesktopPage = () => {
    const useStyles = makeStyles(theme => ({
        projectsDesktopPage: {
            display: "grid",
            gap: "2rem",
            padding: "2rem",
            overflow: "auto",
            height: "90vh",

            [theme.breakpoints.down("lg")]: {
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gridTemplateAreas: `
                    "rank projects"
                    "energies stats"
                `,
            },

            [theme.breakpoints.up("lg")]: {
                gridTemplateColumns: "1fr 1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gridTemplateAreas: `
                    "rank projects energies"
                    "rank projects stats"
                `,
            },
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.projectsDesktopPage}>
            <Rank />
            <Projects />
            <Stats />
            <Energies />
        </div>
    );
};

export default ProjectsDesktopPage;
