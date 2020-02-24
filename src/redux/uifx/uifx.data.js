// UIfx
import UIfx from "uifx";
// Sounds
import bellSound from "../../assets/sounds/bell.mp3";
import congratzSound from "../../assets/sounds/congratulations.mp3";
import whistleSound from "../../assets/sounds/whistle.mp3";

const UIFX_DATA = {
    sessionEndSound: new UIfx(congratzSound, {
        volume: 0.5,
    }),
    minuteLeftSound: new UIfx(bellSound, {
        volume: 1,
    }),

    breakCompleteSound: new UIfx(whistleSound, {
        volume: 1,
    }),
};
export default UIFX_DATA;
