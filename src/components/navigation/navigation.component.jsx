import React from "react";
// Components
import NavigationDesktop from "../navigation-desktop/navigation-desktop.component.jsx";
import NavigationMobile from "../navigation-mobile/navigation-mobile.component.jsx";

const Navigation = () => {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const isMobile = width < 768;

    return isMobile ? <NavigationMobile /> : <NavigationDesktop />;
};

export default Navigation;
