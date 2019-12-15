import React from "react";
// Components
import Stats from "../../components/stats/stats.component.jsx";
import Energies from "../../components/energies/energies.component.jsx";
// Styles
import "./projects.styles.scss";

const ProjectsPage = () => {
    return (
        <div className="projects-page">
            <div className="rank">rank</div>
            <div className="projects">projects</div>
            <Stats />
            <Energies />
        </div>
    );
};

export default ProjectsPage;
