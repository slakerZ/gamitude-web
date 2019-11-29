import React from "react";
import { Link } from "react-router-dom";
import {
    Paper,
    Tabs,
    Tab,
    BottomNavigation,
    BottomNavigationAction,
} from "@material-ui/core";
//Styles
import "./navigation.styles.scss";
// SVG's
import { ReactComponent as ProjectsIcon } from "../../assets/icons/projects.svg";
import { ReactComponent as BulletJournalIcon } from "../../assets/icons/journal.svg";
import { ReactComponent as Logo } from "../../assets/icons/sloth.svg";

class Navigation extends React.Component {
    constructor() {
        super();
        this.state = {
            width: window.innerWidth,
        };
    }
    componentWillMount() {
        window.addEventListener("resize", this.handleWindowSizeChange);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowSizeChange);
    }
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };
    render() {
        const iconStyles = { width: "6vh", height: "6vh" };
        const iconStylesMobile = { width: "4vh", height: "4vh" };
        const isMobile = this.state.width < 768;
        const patology = { position: "fixed", bottom: 0, left: 0 };
        return !isMobile ? (
            <Paper square>
                <Tabs
                    className="navigation"
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="HOME PROJECTS BULLETJOURNAL"
                >
                    <Link to="/" className="nav-link">
                        <Tab
                            icon={<Logo style={iconStyles} />}
                            aria-label="HOME"
                        />
                    </Link>
                    <Link to="/projects" className="nav-link">
                        <Tab
                            icon={<ProjectsIcon style={iconStyles} />}
                            aria-label="PROJECTS"
                        />
                    </Link>
                    <Link to="/bulletJournal" className="nav-link">
                        <Tab
                            icon={<BulletJournalIcon style={iconStyles} />}
                            aria-label="BULLETJOURNAL"
                        />
                    </Link>
                </Tabs>
            </Paper>
        ) : (
            <BottomNavigation style={patology} showLabels>
                <BottomNavigationAction
                    label="Home"
                    icon={<Logo style={iconStylesMobile} />}
                />
                <BottomNavigationAction
                    label="Projects"
                    icon={<ProjectsIcon style={iconStylesMobile} />}
                />{" "}
                <BottomNavigationAction
                    label="BulletJournal"
                    icon={<BulletJournalIcon style={iconStylesMobile} />}
                />
            </BottomNavigation>
        );
    }
}

export default Navigation;
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
