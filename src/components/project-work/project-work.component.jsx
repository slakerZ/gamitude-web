import React from "react";
// Components
import CustomTimer from "../custom-timer/custom-timer.component.jsx";
import ToggleButtons from "../projects-toggle/projects-toggle.component.jsx";

const ProjectWork = () => {
    return (
        <div>
            <CustomTimer time={25} />
            <ToggleButtons />
        </div>
    );
};

export default ProjectWork;
