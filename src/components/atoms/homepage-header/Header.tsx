import React from "react";
import "./style.css";

const Header = () => {
    return (
        <div id="header" className="section">
            <img
                className="lax blok pierwszy"
                alt="Pierwsze tło"
                src="https://images.pexels.com/photos/904807/pexels-photo-904807.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                //data-lax-translate-y="0 0, vh -100"
            />
            <div
                className="lax start"
                data-lax-translate-y="0 0, vh 100"
                data-lax-opacity="0 1, 300 0"
            >
                <p className="tytul">Gamitude</p>
                <p className="wtekst">
                    Manage your <b>Energy</b>, not your <i>Time</i>
                </p>
            </div>
        </div>
    );
};

export default Header;
