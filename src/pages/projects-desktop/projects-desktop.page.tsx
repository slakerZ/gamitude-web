import React from "react";
// Components
import Projects from "../../components/molecules/projects/projects.component";
// Local
import useProjectDesktopStyles from "./styles";

const ProjectsDesktopPage = () => {
    const classes = useProjectDesktopStyles();

    return (
        <div className={classes.projectsDesktopPage}>
            <Projects />
        </div>
    );
};

export default ProjectsDesktopPage;
