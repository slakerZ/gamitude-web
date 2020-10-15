import React, { useState } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Fade } from "@material-ui/core";

const useStyles = makeStyles({
    button: {
        position: "absolute",
        top: "170%",
        left: "45%",
    },
});

function Idea() {
    const style = useStyles();
    const [clicks, setClicks] = useState(false);

    const handleChange = () => {
        setClicks(prev => !prev);
    };

    return (
        <div id="Idea" className="section">
            <img
                className="lax blok drugi"
                alt="Drugie tło"
                src="img/1.jpg"
                //data-lax-translate-y="0 0, vh -320"
                //data-lax-opacity="0 0, 400 1"
            />
            <div
                style={{
                    top: "110%",
                    transform: "translate(-50%, -50%)",
                }}
                className="lax header"
                //data-lax-translate-y="0 0, vh 300"
                //data-lax-opacity="100 0, 400 1"
            >
                <p className="tytul">Purpose and goal</p>
                <Fade in={clicks}>
                    <p className="Is">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc justo libero, egestas vestibulum odio eget,
                        lobortis cursus sapien.{" "}
                    </p>
                </Fade>
            </div>
            <Fade in={!clicks}>
                <div
                    className="lax tekst"
                    style={{
                        float: "left",
                        left: "10%",
                        top: "130%",
                    }}
                    //data-lax-opacity="100 0, 400 1"
                >
                    Gamitude is a project that has a goal to help people manage
                    their energy. By doing so, they can stay focused for longer
                    period of time completing their tasks.
                </div>
            </Fade>
            <Fade in={!clicks}>
                <div
                    className="lax tekst"
                    style={{
                        float: "right",
                        left: "60%",
                        top: "130%",
                    }}
                    //data-lax-opacity="100 0, 400 1"
                >
                    It also has a purpose to motivate people to develop
                    themselves in different areas of life and orginise
                    themselves.
                </div>
            </Fade>
            <Fade in={!clicks}>
                <div
                    className="lax"
                    //data-lax-opacity="100 0, 400 1"
                >
                    <img
                        className="ikonal"
                        alt="battery"
                        src="img/battery.png"
                        style={{
                            top: "150%",
                            left: "13%",
                        }}
                    />
                    <img
                        className="ikonal"
                        alt="list"
                        src="img/list.png"
                        style={{
                            top: "150%",
                            left: "28%",
                        }}
                    />
                    <img
                        className="ikonar"
                        alt="strength"
                        src="img/strength.png"
                        style={{
                            top: "140%",
                            left: "63%",
                        }}
                    />
                    <img
                        className="ikonar"
                        alt="intelligence"
                        src="img/intelligence.png"
                        style={{
                            top: "140%",
                            left: "75%",
                        }}
                    />
                    <img
                        alt="fluency"
                        className="ikonar"
                        src="img/fluency.png"
                        style={{
                            top: "160%",
                            left: "75%",
                        }}
                    />
                    <img
                        alt="creativity"
                        className="ikonar"
                        src="img/creativity.png"
                        style={{
                            top: "160%",
                            left: "63%",
                        }}
                    />
                </div>
            </Fade>
            <Button
                className={`${style.button} lax`}
                //data-lax-opacity="100 0, 400 1"
                variant="contained"
                color="primary"
                onClick={handleChange}
            >
                {clicks ? "Learn less" : "Learn more"}
            </Button>
        </div>
    );
}

export default Idea;
