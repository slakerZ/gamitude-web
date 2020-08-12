import { SimpleTooltipType, ComplexTooltipType } from "./types";

export const targetToSimpleTooltipObject = (
    target: string,
): SimpleTooltipType => {
    switch (target) {
        case "rankRequirements":
            return rankRequirements;

        default:
            return rankRequirements;
    }
};

export const targetToComplexTooltipObject = (
    target: string,
): ComplexTooltipType => {
    switch (target) {
        case "body":
            return body;
        default:
            return body;
    }
};

const rankRequirements = {
    variant: "simple",
    title: "Rank Requirements",
    bodyItems: [
        "These represent the requirements for unlocking this rank, you can think of them as rank's mana cost",
        "Two most dominant of these will be displayed in the background below and their colors will decide the card color",
    ],
};

const body = {
    variant: "complex",
    title: "Body",
    subtitle:
        "Energy meant to represent your physical wellness, whether body is tense or relaxed, whether the body feels light or heavy",
    listIntro: "Build up through:",
    listItems: [
        "adequate nutrition",
        "sleeping well",
        "stretching, yoga and other light physical activities",
    ],
};
