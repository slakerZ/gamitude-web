import React from "react";
import { useWindowSize } from "react-use";
import { connect } from "react-redux";
// Selectors
import { selectToken } from "../../redux/user/user.selectors.js";
// Pages
import ProjectsDesktopPage from "../projects-desktop/projects-desktop.page.jsx";
import ProjectsMobilePage from "../projects-mobile/projects-mobile.page.jsx";
import { Redirect } from "react-router-dom";

const ProjectsPage = ({ token }) => {
    const { width } = useWindowSize();
    return !token ? (
        <Redirect to="/signInSignUp" />
    ) : width < 600 ? (
        <ProjectsMobilePage />
    ) : (
        <ProjectsDesktopPage />
    );
};

const mapStateToProps = state => ({
    token: selectToken(state),
});

export default connect(mapStateToProps)(ProjectsPage);
