import { MsToMinutesType } from "./types";

export const leftPad = (val: number): string =>
    val < 10 ? `0${val}` : `${val}`;

export const milisecondsToMinutes = (time: number): MsToMinutesType => {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return {
        minutes: minutes,
        seconds: seconds,
    };
};
