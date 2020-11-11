import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useWindowSize } from "react-use";

import { selectToken } from "redux/user/user.selectors";

import ProjectsDesktopPage from "pages/projects-desktop/projects-desktop.page";
import ProjectsMobilePage from "pages/projects-mobile/projects-mobile.page";

interface ProjectsPageProps {
    token: string;
}

const ProjectsPage = ({ token }: ProjectsPageProps) => {
    const { width } = useWindowSize();
    return !token ? (
        <Redirect to="/signInSignUp" />
    ) : width < 600 ? (
        <ProjectsMobilePage />
    ) : (
        <ProjectsDesktopPage />
    );
};

const mapStateToProps = (state: any) => ({
    token: selectToken(state),
});

export default connect(mapStateToProps)(ProjectsPage);
