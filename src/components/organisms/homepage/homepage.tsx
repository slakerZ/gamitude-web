import shop from "assets/icons/homepage/Themes-shop.png";
import bar1 from "assets/icons/homepage/bar1-2.png";
import bar2 from "assets/icons/homepage/bar3-4.png";
import bullet from "assets/icons/homepage/bulletEx.png";
import elastic from "assets/icons/homepage/elastic.jpg";
import habits from "assets/icons/homepage/habits.png";
import profile from "assets/icons/homepage/profile.png";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import "./style.css";

const useStyles = makeStyles({
    Ideabutton: {
        position: "absolute",
        top: "170%",
        left: "46%",
    },
    Metbutton: {
        position: "absolute",
        top: "120%",
        left: "25%",
    },
    statbutton: {
        position: "absolute",
        top: "380%",
        left: "30%",
    },
    chek: {
        position: "absolute",
        top: "153%",
        left: "25%",
    },
    energybutton: {
        position: "absolute",
        top: "475%",
        left: "46%",
    },
    rankbutton: {
        position: "absolute",
        top: "575%",
        left: "68%",
    },
    shopbutton: {
        position: "absolute",
        top: "885%",
        left: "46%",
    },
    creatorsbutton: {
        position: "absolute",
        top: "972%",
        left: "44%",
    },
});

const Homepage = () => {
    const style = useStyles();
    const [clicks, setClicks] = useState(false);
    const [mclicked, setMClicked] = useState(false);
    const [mclick, setMClick] = useState(false);
    const [clickstats, setClickstats] = useState(false);
    const [clickenergy, setClickenergy] = useState(false);

    const handleClickenergy = () => {
        setClickenergy((prev) => !prev);
    };

    const handleClickstats = () => {
        setClickstats((prev) => !prev);
    };

    const handleMClick = () => {
        setMClick((prev) => !prev);
    };

    const handleMClicked = () => {
        setMClicked((prev) => !prev);
    };

    const handleChange = () => {
        setClicks((prev) => !prev);
    };

    return (
        <div>
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
            <div id="header" className="section">
                <img
                    className="lax blok drugi"
                    alt="Drugie tło"
                    src="https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    //data-lax-translate-y="0 0, vh -320"
                    //data-lax-opacity="0 0, 400 1"
                />
                <div
                    style={{
                        top: "110%",
                        transform: "translate(-50%, -50%)",
                    }}
                    className="header"
                    //data-lax-translate-y="0 0, vh 300"
                >
                    <p className="tytul lax" data-lax-preset="fadeInOut">
                        Purpose and goal
                    </p>
                    <Fade in={clicks}>
                        <p className="Is lax" data-lax-preset="fadeInOut">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nunc justo libero, egestas vestibulum odio
                            eget, lobortis cursus sapien.{" "}
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
                        data-lax-preset="fadeInOut"
                    >
                        Gamitude is a project that has a goal to help people
                        manage their energy. By doing so, they can stay focused
                        for longer period of time completing their tasks.
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
                        data-lax-preset="fadeInOut"
                    >
                        It also has a purpose to motivate people to develop
                        themselves in different areas of life and orginise
                        themselves.
                    </div>
                </Fade>
                <Fade in={!clicks}>
                    <div>
                        <img
                            className="ikonal lax"
                            alt="battery"
                            src="https://www.flaticon.com/svg/static/icons/svg/2130/2130612.svg"
                            style={{
                                top: "150%",
                                left: "13%",
                            }}
                            data-lax-preset="fadeInOut"
                        />
                        <img
                            className="ikonal lax"
                            alt="list"
                            src="https://www.flaticon.es/svg/static/icons/svg/1440/1440998.svg"
                            style={{
                                top: "150%",
                                left: "28%",
                            }}
                            data-lax-preset="fadeInOut"
                        />
                        <img
                            className="ikonar lax"
                            alt="strength"
                            src="https://www.flaticon.com/svg/static/icons/svg/994/994882.svg"
                            style={{
                                top: "140%",
                                left: "63%",
                            }}
                            data-lax-preset="fadeInOut"
                        />
                        <img
                            className="ikonar lax"
                            alt="intelligence"
                            src="https://www.flaticon.com/svg/static/icons/svg/2345/2345141.svg"
                            style={{
                                top: "140%",
                                left: "75%",
                            }}
                            data-lax-preset="fadeInOut"
                        />
                        <img
                            alt="fluency"
                            className="ikonar lax"
                            src="https://www.flaticon.com/svg/static/icons/svg/2201/2201590.svg"
                            style={{
                                top: "160%",
                                left: "75%",
                            }}
                            data-lax-preset="fadeInOut"
                        />
                        <img
                            alt="creativity"
                            className="ikonar lax"
                            src="https://www.flaticon.com/svg/static/icons/svg/595/595743.svg"
                            style={{
                                top: "160%",
                                left: "63%",
                            }}
                            data-lax-preset="fadeInOut"
                        />
                    </div>
                </Fade>
                <Button
                    className={`${style.Ideabutton} lax`}
                    variant="contained"
                    color="primary"
                    onClick={handleChange}
                    data-lax-preset="fadeInOut"
                >
                    {clicks ? "Learn less" : "Learn more"}
                </Button>
            </div>
            <div id="header" className="section">
                <img
                    className="lax blok trzeci"
                    alt="Trzecie tło"
                    src="https://images.pexels.com/photos/1037993/pexels-photo-1037993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    //data-lax-translate-y="0 0, vh -340"
                    //data-lax-opacity="500 0, 800 1"
                />
                <div
                    style={{
                        top: "215%",
                        transform: "translate(-50%, -50%)",
                    }}
                    className="lax header"
                    //data-lax-translate-y="0 0, 200 -200"
                    //data-lax-opacity="500 0, 700 1"
                    data-lax-preset="fadeInOut"
                >
                    <p className="tytul">Methodologies used in this project</p>
                </div>
                <div
                    className="lax tekst"
                    //data-lax-translate-y="0 0, vh -400"
                    //data-lax-opacity="500 0, 700 1"
                    data-lax-preset="fadeInOut"
                    style={{
                        float: "left",
                        top: "225%",
                        left: "10%",
                    }}
                >
                    <p style={{ textAlign: "center" }}>
                        <b>Pomodoro</b>
                    </p>
                    <Fade in={!mclicked}>
                        <ul>
                            <li>Decide on the task to be done.</li>
                            <li>
                                Set the pomodoro timer to 25 minutes and start
                                working on the task
                            </li>
                            <li>Then rest for 5 minutes</li>
                            <li>
                                If you already had 4 repetition, rest for 15-30
                                minutes
                            </li>
                        </ul>
                    </Fade>
                    <Button
                        className={style.Metbutton}
                        variant="contained"
                        color="primary"
                        onClick={handleMClicked}
                    >
                        Learn More Pomodoro
                    </Button>
                </div>
                <div
                    className="lax tekst"
                    //data-lax-translate-y="0 0, vh -400"
                    //data-lax-opacity="500 0, 700 1"
                    data-lax-preset="fadeInOut"
                    style={{
                        float: "left",
                        top: "235%",
                        left: "10%",
                    }}
                >
                    <Fade in={mclicked}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nunc justo libero, egestas vestibulum odio
                            eget, lobortis cursus sapien.{" "}
                        </p>
                    </Fade>
                </div>
                <div
                    className="lax tekst"
                    //data-lax-translate-y="0 0, vh -400"
                    //data-lax-opacity="500 0, 700 1"
                    data-lax-preset="fadeInOut"
                    style={{
                        float: "left",
                        top: "225%",
                        left: "60%",
                    }}
                >
                    <p style={{ textAlign: "center" }}>
                        <b>90/30</b>
                    </p>
                    <Fade in={!mclick}>
                        <ul>
                            <li>
                                Decide what is your most important task to focus
                                on
                            </li>
                            <li>Spend 90 minutes on it without interuptions</li>
                            <li>Then rest for 20-30 minutes</li>
                        </ul>
                    </Fade>
                    <Button
                        className={style.chek}
                        variant="contained"
                        color="secondary"
                        onClick={handleMClick}
                    >
                        Learn More about 90/30
                    </Button>
                </div>
                <div
                    className="lax tekst"
                    //data-lax-translate-y="0 0, vh -400"
                    //data-lax-opacity="500 0, 700 1"
                    data-lax-preset="fadeInOut"
                    style={{
                        float: "left",
                        top: "235%",
                        left: "60%",
                    }}
                >
                    <Fade in={mclick}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nunc justo libero, egestas vestibulum odio
                            eget, lobortis cursus sapien.{" "}
                        </p>
                    </Fade>
                </div>
            </div>
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
                            className="lax"
                            data-lax-preset="fadeInOut"
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
                        className="tekst lax"
                        data-lax-preset="fadeInOut"
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
                            czas pracy, patrzą tylko na czas potrzebny do
                            wykonania jej, ignorując holistyczną naturę
                            działania ludzkiego organizmu i potrzebą harmonijnej
                            współpracy obu półkul mózgowych. W pracy wspominane
                            to jest jako, że czas jest surowcem skończonym jak
                            węgiel, a energia nie jak wiatr, dlatego musimy
                            zwracać również uwagę na energie. Dzielą się one na
                            4 główne: duszy, ciała, emocji i umysłu
                        </p>
                    </div>
                </Fade>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickstats}
                    className={`${style.statbutton} lax`}
                    data-lax-preset="fadeInOut"
                >
                    {clickstats ? "Learn less" : "Learn more"}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={`${style.statbutton} lax`}
                    data-lax-preset="fadeInOut"
                    component={Link}
                    to={"/signInSignUp"}
                    style={{ left: "65%" }}
                >
                    Get Started now
                </Button>
            </div>
            <div id="header" className="section">
                <img
                    className="lax blok piaty"
                    alt="Energy"
                    src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    //data-lax-translate-y="0 0, vh -100"
                />
                <div
                    className="lax piaty"
                    style={{ top: "410%" }}
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
                            top: "425%",
                            textAlign: "center",
                            left: "15%",
                            width: "70%",
                            fontSize: "30px",
                            color: "white",
                        }}
                    >
                        <p className="lax" data-lax-preset="blurInOut">
                            Everyone have a pool of energy that they can use
                            during a day. Just like statistics, they are divided
                            into 4, which are used to complete tasks.
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
                            czas pracy, patrzą tylko na czas potrzebny do
                            wykonania jej, ignorując holistyczną naturę
                            działania ludzkiego organizmu i potrzebą harmonijnej
                            współpracy obu półkul mózgowych. W pracy wspominane
                            to jest jako, że czas jest surowcem skończonym jak
                            węgiel, a energia nie jak wiatr, dlatego musimy
                            zwracać również uwagę na energie. Dzielą się one na
                            4 główne: duszy, ciała, emocji i umysłu
                        </p>
                    </div>
                </Fade>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickenergy}
                    data-lax-preset="blurInOut"
                    className={`${style.energybutton} lax`}
                >
                    {clickenergy ? "Learn less" : "Learn more"}
                </Button>
            </div>
            <div id="header" className="section">
                <img
                    className="lax blok szósty"
                    alt="Rank"
                    src="https://images.pexels.com/photos/162339/koala-cute-tree-zoo-162339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    //data-lax-translate-y="0 0, vh -100"
                />
                <div
                    className="lax szósty"
                    //data-lax-translate-y="0 0, vh 100"
                    //data-lax-opacity="0 1, 300 0"
                    data-lax-preset="fadeInOut"
                    style={{ top: "510%" }}
                >
                    <p className="tytul">Ranks</p>
                </div>
                <div
                    className="tekst"
                    style={{
                        top: "530%",
                        textAlign: "justify",
                        left: "5%",
                        width: "40%",
                        fontSize: "25px",
                        color: "white",
                    }}
                >
                    <p className="lax" data-lax-preset="fadeInOut">
                        In our project, we wanted make users feel rewarded for
                        their effort. We came up with an idea to use game system
                        that uses ranks to categorize improvements. We inspired
                        our ranks on a youtube chanel Tierzoo to use animals as
                        ranks that users unlocks. Those animals are separeted in
                        tiers that represents major improvement in statistics.
                    </p>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    href="https://www.youtube.com/channel/UCHsRtomD4twRf5WVHHk-cMw"
                    className={`${style.rankbutton} lax`}
                    data-lax-preset="fadeInOut"
                >
                    Check out Tierzoo!!
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={`${style.rankbutton} lax`}
                    data-lax-preset="fadeInOut"
                    component={Link}
                    to={"/signInSignUp"}
                    style={{ left: "20%" }}
                >
                    Get Started now
                </Button>
                <img
                    className="lax"
                    alt="TierZOO"
                    src="https://i.kym-cdn.com/photos/images/original/001/350/590/cc6.png"
                    style={{
                        position: "absolute",
                        left: "58%",
                        height: "35%",
                        width: "30%",
                        top: "530%",
                    }}
                    data-lax-preset="fadeInOut"
                />
            </div>
            <div id="header" className="section">
                <img
                    className="lax blok siódmy"
                    alt="Elastic Habits"
                    src={elastic}
                    //data-lax-translate-y="0 0, vh -100"
                />
                <div
                    className="lax siódmy"
                    //data-lax-translate-y="0 0, vh 100"
                    //data-lax-opacity="0 1, 300 0"
                    data-lax-preset="fadeInOut"
                    style={{ top: "610%" }}
                >
                    <p className="tytul">Elastic Habits</p>
                </div>
                <div
                    className="tekst"
                    style={{
                        top: "625%",
                        textAlign: "center",
                        left: "15%",
                        width: "70%",
                        fontSize: "30px",
                    }}
                >
                    <p className="lax" data-lax-preset="fadeInOut">
                        Elastic Habits is a method of making for every single
                        task that is repetetive different levels of complition.
                        It helps to build up a habit of doing those tasks even
                        if we are tired or unmotivated to do it.
                    </p>
                    <img
                        className="lax"
                        alt="Habits table"
                        src={habits}
                        style={{
                            height: "55%",
                            width: "55%",
                        }}
                        data-lax-preset="fadeInOut"
                    />
                </div>
            </div>
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
                        Bullet Journal is a method of managing tasks in longer
                        periods of time. You are separating tasks between 3 main
                        categories: Day, Week, Month. With this, you are
                        creating a deadline to complete them depending on
                        dificulty of task.
                    </p>
                    <img
                        className="lax"
                        alt="Bullet Journal example"
                        src={bullet}
                        height="40%"
                        width="60%"
                        style={{
                            paddingBottom: "20px",
                        }}
                        data-lax-preset="blurInOut"
                    />
                </div>
            </div>
            <div id="header" className="section">
                <img
                    className="lax blok dziewiąty"
                    alt="Shop"
                    src="https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    //data-lax-translate-y="0 0, vh -100"
                />
                <div
                    className="lax dziewiąty"
                    //data-lax-translate-y="0 0, vh 100"
                    //data-lax-opacity="0 1, 300 0"
                    style={{ top: "810%" }}
                    data-lax-preset="fadeInOut"
                >
                    <p className="tytul">Shop</p>
                </div>
                <div
                    className="tekst"
                    style={{
                        top: "825%",
                        textAlign: "center",
                        left: "15%",
                        width: "70%",
                        fontSize: "30px",
                    }}
                >
                    <p className="lax" data-lax-preset="fadeInOut">
                        We are offering different visual packs called skins that
                        will affect how your site look. There are many
                        diversified themes of those skins like Ice Age, Video
                        games or Anime.
                    </p>
                    <img
                        className="lax"
                        alt="Shop"
                        src={shop}
                        style={{
                            height: "55%",
                            width: "55%",
                        }}
                        data-lax-preset="fadeInOut"
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className={`${style.shopbutton} lax`}
                    data-lax-preset="fadeInOut"
                    component={Link}
                    to={"/signInSignUp"}
                >
                    Get Started now
                </Button>
            </div>
            <div id="header" className="section">
                <img
                    className="lax blok dziesiąty"
                    alt="Czwarte tło"
                    src="https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    //data-lax-translate-y="0 0, vh -200"
                    //data-lax-opacity="900 0, 1500 1"
                />
                <div
                    style={{
                        top: "920%",
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
                        src={profile}
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
                        src={profile}
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
                        src={profile}
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
                    className={`${style.creatorsbutton} lax`}
                    //data-lax-opacity="900 0, 1500 1"
                    data-lax-preset="blurInOut"
                    variant="contained"
                    color="primary"
                    href={"https://github.com/slakerZ"}
                >
                    Learn More about us
                </Button>
            </div>
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
        </div>
    );
};
export default Homepage;
