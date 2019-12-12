import React from "react";
// Components
import StatsAndEnergies from "../../components/stats-and-energies/stats-and-energies.component.jsx";

// Styles
import "./projects.styles.scss";

const ProjectsPage = () => {
    return (
        <div className="projects-page">
            <div className="rank">rank</div>
            <div className="projects">projects</div>
            <StatsAndEnergies which="energies" />
            <StatsAndEnergies which="stats" />
        </div>
    );
};

export default ProjectsPage;
