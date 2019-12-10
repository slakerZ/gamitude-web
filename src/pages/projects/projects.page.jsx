import React from "react";
// Components
import Energies from "../../components/energies/energies.component.jsx";
// Styles
import "./projects.styles.scss";

const ProjectsPage = () => {
    return (
        <div className="projects-page">
            <div className="rank">rank</div>
            <div className="projects">projects</div>
            <Energies />
            <div className="stats">stats</div>
        </div>
    );
};

export default ProjectsPage;
