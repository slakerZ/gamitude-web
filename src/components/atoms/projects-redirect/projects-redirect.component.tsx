import React from "react";
import { Redirect } from "react-router-dom";

const ProjectsRedirect = ({ state }: { state: any }) => {
    return state.value && !state.loading && !state.error ? (
        <Redirect to="/projects" />
    ) : null;
};

export default ProjectsRedirect;
