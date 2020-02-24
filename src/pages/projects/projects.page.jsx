import React from "react";
import { useWindowSize } from "react-use";
// Pages
import ProjectsDesktopPage from "../projects-desktop/projects-desktop.page.jsx";
import ProjectsMobilePage from "../projects-mobile/projects-mobile.page.jsx";

const ProjectsPage = () => {
    const { width } = useWindowSize();

    return width < 600 ? <ProjectsMobilePage /> : <ProjectsDesktopPage />;
};

export default ProjectsPage;
