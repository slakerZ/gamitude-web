import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    button: {
        position: "absolute",
        top: "980%",
        left: "43.5%",
    },
});

function Creators() {
    const style = useStyles();

    return (
        <div id="creators" className="section">
            <img
                className="lax blok dziesiąty"
                alt="Czwarte tło"
                src="img/3.jpg"
                //data-lax-translate-y="0 0, vh -200"
                //data-lax-opacity="900 0, 1500 1"
            />
            <div
                style={{
                    top: "910%",
                    transform: "translate(-50%, -50%)",
                }}
                className="lax header"
                //data-lax-opacity="900 0, 1500 1"
                //data-lax-translate-y="0 0, vh -200"
                data-lax-preset="blurInOut"
            >
                <p className="tytul">Creators</p>
            </div>
            <div
                style={{
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                }}
                className="lax name"
                //data-lax-opacity="900 0, 1500 1"
                //data-lax-translate-y="0 0, vh -200"
            >
                <img
                    className="lax profil"
                    alt="profile"
                    src="img/profile.png"
                    style={{
                        left: "20%",
                    }}
                    data-lax-preset="blurInOut"
                />
                <p className="wtekst lax" data-lax-preset="blurInOut">
                    Paweł <br></br>Benkowski
                </p>
            </div>
            <div
                style={{
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
                className="lax name"
                //data-lax-opacity="900 0, 1500 1"
                //data-lax-translate-y="0 0, vh -200"
            >
                <img
                    className="lax profil"
                    alt="profile"
                    src="img/profile.png"
                    style={{
                        left: "5%",
                    }}
                    data-lax-preset="blurInOut"
                />
                <p className="wtekst lax" data-lax-preset="blurInOut">
                    Robert <br></br>Deyk
                </p>
            </div>
            <div
                style={{
                    left: "80%",
                    transform: "translate(-50%, -50%)",
                }}
                className="lax name"
                //data-lax-opacity="900 0, 1500 1"
                //data-lax-translate-y="0 0, vh -200"
            >
                <img
                    className="lax profil"
                    alt="profile"
                    src="img/profile.png"
                    style={{
                        left: "25%",
                    }}
                    data-lax-preset="blurInOut"
                />
                <p className="wtekst lax" data-lax-preset="blurInOut">
                    Stanisław Lutkiewicz
                </p>
            </div>
            <Button
                className={`${style.button} lax`}
                //data-lax-opacity="900 0, 1500 1"
                data-lax-preset="blurInOut"
                variant="contained"
                color="primary"
                href={"https://github.com/slakerZ"}
            >
                Learn More about us
            </Button>
        </div>
    );
}

export default Creators;
