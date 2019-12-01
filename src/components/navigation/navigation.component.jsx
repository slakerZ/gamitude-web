import React from "react";
// Components
import NavigationDesktop from "../navigation-desktop/navigation-desktop.component.jsx";
import NavigationMobile from "../navigation-mobile/navigation-mobile.component.jsx";

//TODO replace this method of handling resizing with a better one - react-sizes library
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
        };
        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    }
    UNSAFE_componentWillMount() {
        window.addEventListener("resize", this.handleWindowSizeChange);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowSizeChange);
    }
    handleWindowSizeChange() {
        this.setState({ width: window.innerWidth });
    }
    render() {
        const isMobile = this.state.width < 768;

        return isMobile ? <NavigationMobile /> : <NavigationDesktop />;
    }
}

export default Navigation;
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
// <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
