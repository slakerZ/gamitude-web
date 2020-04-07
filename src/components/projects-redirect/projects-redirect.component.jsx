import React from "react";
import { Redirect } from "react-router-dom";

const ProjectsRedirect = ({ state }) => {
    return state.value && !state.loading && !state.error ? (
        <Redirect to="/projects" />
    ) : null;
};

export default ProjectsRedirect;
