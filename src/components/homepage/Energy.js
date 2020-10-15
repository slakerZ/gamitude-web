import React, { useState } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    button: {
        position: "absolute",
        top: "470%",
        left: "45%",
    },
});

function Energy() {
    const style = useStyles();
    const [clickenergy, setClickenergy] = useState(false);

    const handleChange = () => {
        setClickenergy(prev => !prev);
    };

    return (
        <div id="header" className="section">
            <img
                className="lax blok next"
                alt="Energy"
                src="img/energy.jpg"
                //data-lax-translate-y="0 0, vh -100"
            />
            <div
                className="lax next"
                //data-lax-translate-y="0 0, vh 100"
                //data-lax-opacity="0 1, 300 0"
            >
                <p className="tytul">Energy</p>
            </div>
            <Fade in={!clickenergy}>
                <div
                    className="tekst"
                    style={{
                        top: "420%",
                        textAlign: "center",
                        left: "15%",
                        width: "70%",
                        fontSize: "30px",
                        color: "white",
                    }}
                >
                    <p>
                        Everyone have a pool of energy that they can use during
                        a day. Just like statistics, they are divided into 4,
                        which are used to complete tasks.
                    </p>
                    <div style={{ width: "100%" }}>
                        <img
                            alt="bar"
                            src="img/bar1-2.png"
                            style={{
                                height: "45%",
                                width: "45%",
                                paddingRight: "4%",
                            }}
                        />
                        <img
                            alt="bar"
                            src="img/bar3-4.png"
                            style={{
                                left: "9%",
                                height: "45%",
                                width: "45%",
                                top: "540%",
                            }}
                        />
                    </div>
                </div>
            </Fade>
            <Fade in={clickenergy}>
                <div
                    className="tekst"
                    style={{
                        top: "420%",
                        textAlign: "center",
                        left: "15%",
                        width: "70%",
                        fontSize: "30px",
                        color: "white",
                    }}
                >
                    <p>
                        Według pracy harwardzkiej, ludzie organizujący sobie
                        czas pracy, patrzą tylko na czas potrzebny do wykonania
                        jej, ignorując holistyczną naturę działania ludzkiego
                        organizmu i potrzebą harmonijnej współpracy obu półkul
                        mózgowych. W pracy wspominane to jest jako, że czas jest
                        surowcem skończonym jak węgiel, a energia nie jak wiatr,
                        dlatego musimy zwracać również uwagę na energie. Dzielą
                        się one na 4 główne: duszy, ciała, emocji i umysłu
                    </p>
                </div>
            </Fade>
            <Button
                variant="contained"
                color="primary"
                onClick={handleChange}
                className={style.button}
            >
                {clickenergy ? "Learn less" : "Learn more"}
            </Button>
        </div>
    );
}

export default Energy;
