import React, { useState } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    button: {
        position: "absolute",
        top: "380%",
        left: "46%",
    },
});

function Stats() {
    const style = useStyles();
    const [clickstats, setClickstats] = useState(false);

    const handleChange = () => {
        setClickstats((prev) => !prev);
    };

    return (
        <div id="header" className="section">
            <img
                className="lax blok czwarty"
                alt="czwarte tło"
                src="https://images.pexels.com/photos/669622/pexels-photo-669622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                //data-lax-translate-y="0 0, vh -100"
            />
            <div
                className="lax czwarty"
                //data-lax-translate-y="0 0, vh 100"
                //data-lax-opacity="0 1, 300 0"
                data-lax-preset="fadeInOut"
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
                    <p className="lax" data-lax-preset="fadeInOut">
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
                            src="https://www.flaticon.com/svg/static/icons/svg/994/994882.svg"
                            style={{
                                left: "9%",
                                height: "15%",
                                width: "15%",
                                paddingRight: "4%",
                            }}
                        />
                        <img
                            alt="intelligence"
                            src="https://www.flaticon.com/svg/static/icons/svg/2345/2345141.svg"
                            style={{
                                left: "33%",
                                height: "20%",
                                width: "20%",
                                paddingLeft: "5%",
                                paddingRight: "4%",
                            }}
                        />
                        <img
                            alt="fluency"
                            src="https://www.flaticon.com/svg/static/icons/svg/2201/2201590.svg"
                            style={{
                                left: "57%",
                                height: "20%",
                                width: "20%",
                                paddingLeft: "5%",
                                paddingRight: "4%",
                            }}
                        />
                        <img
                            alt="creativity"
                            src="https://www.flaticon.com/svg/static/icons/svg/595/595743.svg"
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
