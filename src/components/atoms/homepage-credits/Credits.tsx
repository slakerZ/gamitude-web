import React from "react";
import "./style.css";
import profile from "../../../assets/icons/homepage/profile.png";

function Credits() {
    return (
        <div id="header" className="section">
            <img
                className="lax blok ostatni"
                alt="Credits"
                src="https://images.pexels.com/photos/262034/pexels-photo-262034.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                //data-lax-translate-y="0 0, vh -100"
            />
            <div
                className="lax ostatni"
                //data-lax-translate-y="0 0, vh 100"
                //data-lax-opacity="0 1, 300 0"
                style={{ top: "1010%" }}
            >
                <p className="tytul">Credits</p>
            </div>
            <div
                style={{
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                }}
                className="lax namec"
                //data-lax-opacity="900 0, 1500 1"
                //data-lax-translate-y="0 0, vh -200"
            >
                <img
                    className="lax profil"
                    alt="profile"
                    src={profile}
                    style={{
                        left: "20%",
                    }}
                />
                <p className="wtekst">
                    Jan <br></br>Kowalski
                </p>
            </div>
            <div
                style={{
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
                className="lax namec"
                //data-lax-opacity="900 0, 1500 1"
                //data-lax-translate-y="0 0, vh -200"
            >
                <img
                    className="lax profil"
                    alt="profile"
                    src={profile}
                    style={{
                        left: "5%",
                    }}
                />
                <p className="wtekst">
                    Piotr<br></br>Nowak
                </p>
            </div>
            <div
                style={{
                    left: "80%",
                    transform: "translate(-50%, -50%)",
                }}
                className="lax namec"
                //data-lax-opacity="900 0, 1500 1"
                //data-lax-translate-y="0 0, vh -200"
            >
                <img
                    className="lax profil"
                    alt="profile"
                    src={profile}
                    style={{
                        left: "25%",
                    }}
                />
                <p className="wtekst">Czesław Ziemien</p>
            </div>
        </div>
    );
}

export default Credits;
