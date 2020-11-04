import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import shop from "../../../assets/icons/homepage/Themes-shop.png";

const useStyles = makeStyles({
    button: {
        position: "absolute",
        top: "885%",
        left: "46%",
    },
});

function Shop() {
    const style = useStyles();
    return (
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
                data-lax-preset="zoomInOut"
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
                <p className="lax" data-lax-preset="zoomInOut">
                    We are offering different visual packs called skins that
                    will affect how your site look. There are many diversified
                    themes of those skins like Ice Age, Video games or Anime.
                </p>
                <img
                    className="lax"
                    alt="Shop"
                    src={shop}
                    style={{
                        height: "55%",
                        width: "55%",
                    }}
                    data-lax-preset="zoomInOut"
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                className={`${style.button} lax`}
                data-lax-preset="fadeInOut"
            >
                Register now
            </Button>
        </div>
    );
}

export default Shop;
