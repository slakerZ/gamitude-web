import React from "react";
import { Link } from "react-router-dom";
//Styles
import "./navigation.styles.scss";
const Navigation = () => {
    return (
        <nav className="navigation">
            <Link to="/">
                <div>Home</div>
            </Link>
            <Link to="/projects">
                <div>Projects</div>
            </Link>
            <Link to="/bulletJournal">
                <div>Bullet Journal</div>
            </Link>
        </nav>
    );
};

export default Navigation;
