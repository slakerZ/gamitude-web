import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    button: {
        position: "absolute",
        top: "575%",
        left: "46%",
    },
});

function Rank() {
    const style = useStyles();
    return (
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
                data-lax-preset="zoomInOut"
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
                <p className="lax" data-lax-preset="zoomInOut">
                    In our project, we wanted make users feel rewarded for their
                    effort. We came up with an idea to use game system that uses
                    ranks to categorize improvements. We inspired our ranks on a
                    youtube chanel Tierzoo to use animals as ranks that users
                    unlocks. Those animals are separeted in tiers that
                    represents major improvement in statistics.
                </p>
            </div>
            <Button
                variant="contained"
                color="primary"
                href="https://www.youtube.com/channel/UCHsRtomD4twRf5WVHHk-cMw"
                className={`${style.button} lax`}
                data-lax-preset="zoomInOut"
            >
                Check out Tierzoo!!
            </Button>
            <img
                className="lax"
                alt="TierZOO"
                src="https://i.kym-cdn.com/photos/images/original/001/350/590/cc6.png"
                style={{
                    position: "absolute",
                    left: "58%",
                    height: "45%",
                    width: "40%",
                    top: "530%",
                }}
                data-lax-preset="zoomInOut"
            />
        </div>
    );
}

export default Rank;
