// UIfx
import UIfx from "uifx";
// Sounds
// import bellSound from "../../assets/sounds/bell.mp3";
// import congratzSound from "../../assets/sounds/congratulations.mp3";
// import whistleSound from "../../assets/sounds/whistle.mp3";

const bellSound = require("../../assets/sounds/bell.mp3");
const congratzSound = require("../../assets/sounds/congratulations.mp3");
const whistleSound = require("../../assets/sounds/whistle.mp3");

const UIFX_DATA = {
    sessionEndSound: new UIfx(congratzSound, {
        volume: 0.1,
    }),
    minuteLeftSound: new UIfx(bellSound, {
        volume: 0.1,
    }),

    breakCompleteSound: new UIfx(whistleSound, {
        volume: 0.1,
    }),
};
export default UIFX_DATA;
