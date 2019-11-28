import React from "react";
import { Link } from "react-router-dom";
//Styles
import "./navigation.styles.scss";
// SVG's
import { ReactComponent as ProjectsIcon } from "../../assets/icons/projects.svg";
import { ReactComponent as BulletJournalIcon } from "../../assets/icons/journal.svg";
import { ReactComponent as Logo } from "../../assets/icons/sloth.svg";

const Navigation = () => {
    return (
        <nav className="navigation">
            <Link to="/" className="nav-link">
                <div className="nav-item">
                    <Logo className="icon" />
                </div>
            </Link>
            <Link to="/projects" className="nav-link">
                <div className="nav-item">
                    <ProjectsIcon className="icon" />
                    Projects
                </div>
            </Link>
            <Link to="/bulletJournal" className="nav-link">
                <div className="nav-item">
                    <BulletJournalIcon className="icon" />
                    Bullet Journal
                </div>
            </Link>
        </nav>
    );
};

export default Navigation;
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
