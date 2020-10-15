import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    button: {
        position: "absolute",
        top: "880%",
        left: "45%",
    },
});

function Shop() {
    const style = useStyles();
    return (
        <div id="header" className="section">
            <img
                className="lax blok dziewiąty"
                alt="Shop"
                src="img/shop.jpg"
                //data-lax-translate-y="0 0, vh -100"
            />
            <div
                className="lax dziewiąty"
                //data-lax-translate-y="0 0, vh 100"
                //data-lax-opacity="0 1, 300 0"
            >
                <p className="tytul">Shop</p>
            </div>
            <div
                className="tekst"
                style={{
                    top: "820%",
                    textAlign: "center",
                    left: "15%",
                    width: "70%",
                    fontSize: "30px",
                }}
            >
                <p>
                    We are offering different visual packs called skins that
                    will affect how your site look. There are many diversified
                    themes of those skins like Ice Age, Video games or Anime.
                </p>
                <img
                    alt="Shop"
                    src="img/Themes-shop.png"
                    style={{
                        height: "55%",
                        width: "55%",
                    }}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                className={style.button}
            >
                Register now
            </Button>
        </div>
    );
}

export default Shop;
