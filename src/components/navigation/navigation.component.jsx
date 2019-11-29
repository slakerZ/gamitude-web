import React from "react";
import { Link } from "react-router-dom";
import { Paper, Tabs, Tab } from "@material-ui/core";
//Styles
import "./navigation.styles.scss";
// SVG's
import { ReactComponent as ProjectsIcon } from "../../assets/icons/projects.svg";
import { ReactComponent as BulletJournalIcon } from "../../assets/icons/journal.svg";
import { ReactComponent as Logo } from "../../assets/icons/sloth.svg";

const Navigation = () => {
    // return (
    //     <nav className="navigation">
    //
    //             <div className="nav-item">
    //                 <Logo className="icon" />
    //             </div>
    //         </Link>
    //
    //             <div className="nav-item">
    //                 <ProjectsIcon className="icon" />
    //                 Projects
    //             </div>
    //         </Link>
    //
    //             <div className="nav-item">
    //                 <BulletJournalIcon className="icon" />
    //                 Bullet Journal
    //             </div>
    //         </Link>
    //     </nav>
    // );
    const iconStyles = { width: "6vh", height: "6vh" };
    return (
        <Paper square>
            <Tabs
                className="navigation"
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="HOME PROJECTS BULLETJOURNAL"
            >
                <Link to="/" className="nav-link">
                    <Tab icon={<Logo style={iconStyles} />} aria-label="HOME" />
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
    );
};

export default Navigation;
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
