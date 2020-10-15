import React from "react";
import "./style.css";

function Header() {
    return (
        <div id="header" className="section">
            <img
                className="lax blok pierwszy"
                alt="Pierwsze tło"
                src="img/jungle.jpg"
                //data-lax-translate-y="0 0, vh -100"
            />
            <div
                className="lax start"
                //data-lax-translate-y="0 0, vh 100"
                //data-lax-opacity="0 1, 300 0"
            >
                <p className="tytul">Gamitude</p>
                <p className="wtekst">
                    Manage your <b>Energy</b>, not your <i>Time</i>
                </p>
            </div>
        </div>
    );
}

export default Header;
