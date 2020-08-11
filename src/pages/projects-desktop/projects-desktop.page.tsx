import React from "react";
// Components
import Stats from "../../components/molecules/stats/stats.component";
import Energies from "../../components/molecules/energies/energies.component";
import Rank from "../../components/organisms/rank/rank.component";
import Projects from "../../components/molecules/projects/projects.component";
// Local
import useProjectDesktopStyles from "./styles";

const ProjectsDesktopPage = () => {
    const classes = useProjectDesktopStyles();

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
