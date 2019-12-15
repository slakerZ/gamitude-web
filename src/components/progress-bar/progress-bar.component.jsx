import React from "react";
import "./progress.styles.scss";

const ProgressBar = ({ children, barType, stat }) => {
    const barStyle = {
        width: `${stat}%`,
    };
    return (
        <div className="container">
            <div className="progress">
                {children}
                <div className={`bar ${barType}`} style={barStyle} />
            </div>
        </div>
    );
};

export default ProgressBar;
