import React from "react";
import { Picture } from "react-responsive-picture";
// Styles
import "./home.styles.scss";
const HomePage = () => {
    return (
        <div className="homepage">
            <div className="rank">
                <Picture
                    className="picture"
                    sources={[
                        {
                            srcSet: require("../../assets/ranks_default/0-0-0-0-tablet.jpg"),
                            media: "(min-width: 520px)",
                        },
                        {
                            srcSet: require("../../assets/ranks_default/0-0-0-0-desktop.jpg"),
                            media: "(min-width: 1080)",
                        },
                    ]}
                />
            </div>
            <div className="projects">projects</div>
            <div className="energies">energies</div>
            <div className="stats">stats</div>
        </div>
    );
};

export default HomePage;
