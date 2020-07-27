import React from "react";
// Components
import Stats from "../../components/molecules/stats/stats.component";
import Energies from "../../components/molecules/energies/energies.component";
import Rank from "../../components/organisms/rank/rank.component";
import Projects from "../../components/molecules/projects/projects.component";
// UI Core
import { makeStyles } from "@material-ui/core/styles";

const ProjectsDesktopPage = () => {
    const useStyles = makeStyles((theme) => ({
        projectsDesktopPage: {
            display: "grid",
            gap: "20px",
            padding: "20px",
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
                gridTemplateColumns: "1fr 1.5fr 1fr",
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
