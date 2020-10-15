import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";

function Bullet() {
    return (
        <div id="header" className="section">
            <img
                className="lax blok ósmy"
                alt="Bullet"
                src="img/bullet.jpg"
                //data-lax-translate-y="0 0, vh -100"
            />
            <div
                className="lax"
                //data-lax-translate-y="0 0, vh 100"
                //data-lax-opacity="0 1, 300 0"
            >
                <p className="tytul ósmy">Bullet</p>
            </div>
            <div
                className="Is"
                style={{
                    top: "710%",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                }}
            >
                <p>
                    {" "}
                    Bullet Journal is a method of managing tasks in longer
                    periods of time. You are separating tasks between 3 main
                    categories: Day, Week, Month. With this, you are creating a
                    deadline to complete them depending on dificulty of task.
                </p>
                <img
                    alt="Bullet Journal example"
                    src="img/bulletEx.png"
                    height="50%"
                    width="70%"
                    style={{
                        paddingBottom: "20px",
                    }}
                />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    href="https://bulletjournal.com/"
                >
                    Learn more
                </Button>
            </div>
        </div>
    );
}

export default Bullet;
