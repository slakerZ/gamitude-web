import React from "react";
import "./style.css";

function Elastic() {
    return (
        <div id="header" className="section">
            <img
                className="lax blok siódmy"
                alt="Elastic Habits"
                src="img/elastic.jpg"
                //data-lax-translate-y="0 0, vh -100"
            />
            <div
                className="lax siódmy"
                //data-lax-translate-y="0 0, vh 100"
                //data-lax-opacity="0 1, 300 0"
                data-lax-preset="fadeInOut"
            >
                <p className="tytul">Elastic Habits</p>
            </div>
            <div
                className="tekst"
                style={{
                    top: "620%",
                    textAlign: "center",
                    left: "15%",
                    width: "70%",
                    fontSize: "30px",
                }}
            >
                <p className="lax" data-lax-preset="fadeInOut">
                    Elastic Habits is a method of making for every single task
                    that is repetetive different levels of complition. It helps
                    to build up a habit of doing those tasks even if we are
                    tired or unmotivated to do it.
                </p>
                <img
                    className="lax"
                    alt="Habits table"
                    src="img/habits.png"
                    style={{
                        height: "55%",
                        width: "55%",
                    }}
                    data-lax-preset="fadeInOut"
                />
            </div>
        </div>
    );
}

export default Elastic;
