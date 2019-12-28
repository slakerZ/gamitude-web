import React from "react";
import Slider from "@material-ui/core/Slider";

const CustomSlider = ({ name }) => {
    const valuetext = value => {
        return `${value}`;
    };

    const marks = [
        {
            value: 0,
            label: "0",
        },
        {
            value: 50,
            label: `${name}`,
        },
        {
            value: 100,
            label: "100",
        },
    ];
    return (
        <Slider
            defaultValue={0}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-always"
            step={1}
            marks={marks}
            valueLabelDisplay="auto"
        />
    );
};

export default CustomSlider;
