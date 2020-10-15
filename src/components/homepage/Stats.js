import React, { useState } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    button: {
        position: "absolute",
        top: "380%",
        left: "45%",
    },
});

function Stats() {
    const style = useStyles();
    const [clickstats, setClickstats] = useState(false);

    const handleChange = () => {
        setClickstats(prev => !prev);
    };

    return (
        <div id="header" className="section">
            <img
                className="lax blok czwarty"
                alt="Pierwsze tło"
                src="img/stats.jpg"
                //data-lax-translate-y="0 0, vh -100"
            />
            <div
                className="lax czwarty"
                //data-lax-translate-y="0 0, vh 100"
                //data-lax-opacity="0 1, 300 0"
            >
                <p className="tytul">Stats</p>
            </div>
            <Fade in={!clickstats}>
                <div
                    className="tekst"
                    style={{
                        top: "320%",
                        textAlign: "center",
                        left: "15%",
                        width: "70%",
                        fontSize: "30px",
                    }}
                >
                    <p>
                        Stats is the time spent on tasks developing specific
                        thing. There are 4 type of statistics: Strength,
                        Intelligence, Fluency and Creativity represented by
                        icons below.
                    </p>
                    <div
                        style={{
                            top: "340%",
                            width: "100%",
                            paddingTop: "50px",
                            paddingBottom: "20px",
                        }}
                    >
                        <img
                            alt="strength"
                            src="img/strength.png"
                            style={{
                                left: "9%",
                                height: "15%",
                                width: "15%",
                                paddingRight: "4%",
                            }}
                        />
                        <img
                            alt="intelligence"
                            src="img/intelligence.png"
                            style={{
                                left: "33%",
                                height: "15%",
                                width: "15%",
                                paddingLeft: "5%",
                                paddingRight: "4%",
                            }}
                        />
                        <img
                            alt="fluency"
                            src="img/fluency.png"
                            style={{
                                left: "57%",
                                height: "15%",
                                width: "15%",
                                paddingLeft: "5%",
                                paddingRight: "4%",
                            }}
                        />
                        <img
                            alt="creativity"
                            src="img/creativity.png"
                            style={{
                                left: "81%",
                                height: "15%",
                                width: "15%",
                                paddingLeft: "5%",
                            }}
                        />
                    </div>
                </div>
            </Fade>
            <Fade in={clickstats}>
                <div
                    className="tekst"
                    style={{
                        top: "320%",
                        textAlign: "center",
                        left: "15%",
                        width: "70%",
                        fontSize: "30px",
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
                {clickstats ? "Learn less" : "Learn more"}
            </Button>
        </div>
    );
}

export default Stats;
