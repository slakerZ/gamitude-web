import React from "react";
import { useWindowSize } from "react-use";
// Components
import NavigationDesktop from "../navigation-desktop/navigation-desktop.component.jsx";
import NavigationMobile from "../navigation-mobile/navigation-mobile.component.jsx";

const Navigation = () => {
    const { width, height } = useWindowSize();

    const isMobile = width < 768 && height < 1600;

    return isMobile ? <NavigationMobile /> : <NavigationDesktop />;
};

export default Navigation;
