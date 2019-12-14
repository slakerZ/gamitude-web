import React from "react";
import { connect } from "react-redux";
// Components
import NavigationDesktop from "../navigation-desktop/navigation-desktop.component.jsx";
import NavigationMobile from "../navigation-mobile/navigation-mobile.component.jsx";
// Actions
import { setWidth } from "../../redux/navigation/navigation.actions";

const Navigation = ({ width, setWidth }) => {
    window.addEventListener("resize", value => setWidth(value));
    const isMobile = width < 768;
    return isMobile ? <NavigationMobile /> : <NavigationDesktop />;
};

const mapStateToProps = state => ({
    width: state.navigation.width,
});

const mapDispatchToProps = dispatch => ({
    setWidth: value => dispatch(setWidth(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
