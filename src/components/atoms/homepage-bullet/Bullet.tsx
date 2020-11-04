import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import bullet from "../../../assets/icons/homepage/bulletEx.png";

function Bullet() {
    return (
        <div id="header" className="section">
            <img
                className="lax blok ósmy"
                alt="Bullet"
                src="https://images.pexels.com/photos/606539/pexels-photo-606539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                //data-lax-translate-y="0 0, vh -100"
            />
            <div
                className="lax ósmy"
                data-lax-preset="blurInOut"
                //data-lax-translate-y="0 0, vh 100"
                //data-lax-opacity="0 1, 300 0"
                style={{ top: "710%" }}
            >
                <p className="tytul ósmy">Bullet</p>
            </div>
            <div
                className="Is"
                style={{
                    top: "725%",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                }}
            >
                <p className="lax" data-lax-preset="blurInOut">
                    {" "}
                    Bullet Journal is a method of managing tasks in longer
                    periods of time. You are separating tasks between 3 main
                    categories: Day, Week, Month. With this, you are creating a
                    deadline to complete them depending on dificulty of task.
                </p>
                <img
                    className="lax"
                    alt="Bullet Journal example"
                    src={bullet}
                    height="50%"
                    width="70%"
                    style={{
                        paddingBottom: "20px",
                    }}
                    data-lax-preset="blurInOut"
                />
            </div>
        </div>
    );
}

export default Bullet;
