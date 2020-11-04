import React, { useState } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bar1 from "../../../assets/icons/homepage/bar1-2.png";
import bar2 from "../../../assets/icons/homepage/bar3-4.png";

const useStyles = makeStyles({
    button: {
        position: "absolute",
        top: "470%",
        left: "46%",
    },
});

function Energy() {
    const style = useStyles();
    const [clickenergy, setClickenergy] = useState(false);

    const handleChange = () => {
        setClickenergy((prev) => !prev);
    };

    return (
        <div id="header" className="section">
            <img
                className="lax blok next"
                alt="Energy"
                src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                //data-lax-translate-y="0 0, vh -100"
            />
            <div
                className="lax next"
                //data-lax-translate-y="0 0, vh 100"
                //data-lax-opacity="0 1, 300 0"
                data-lax-preset="blurInOut"
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
                    <p className="lax" data-lax-preset="blurInOut">
                        Everyone have a pool of energy that they can use during
                        a day. Just like statistics, they are divided into 4,
                        which are used to complete tasks.
                    </p>
                    <div style={{ width: "100%" }}>
                        <img
                            className="lax"
                            alt="bar"
                            src={bar1}
                            style={{
                                height: "45%",
                                width: "45%",
                                paddingRight: "4%",
                            }}
                            data-lax-preset="blurInOut"
                        />
                        <img
                            className="lax"
                            alt="bar"
                            src={bar2}
                            style={{
                                left: "9%",
                                height: "40%",
                                width: "40%",
                                top: "540%",
                            }}
                            data-lax-preset="blurInOut"
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
                    <p className="lax" data-lax-preset="blurInOut">
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
