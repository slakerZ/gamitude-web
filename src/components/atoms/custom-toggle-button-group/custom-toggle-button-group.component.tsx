import React from "react";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import CustomIcon from "../custom-icon/custom-icon.component";

import { CustomToggleButtonGroupPropTypes } from "./types";

import useCustomToggleButtonGroupStyles from "./styles";

const CustomToggleButtonGroup = ({
    value,
    handleChange,
    items,
    exclusive = false,
}: CustomToggleButtonGroupPropTypes) => {
    const classes = useCustomToggleButtonGroupStyles();

    return (
        <ToggleButtonGroup
            value={value}
            onChange={handleChange}
            aria-label="custom toggle button group"
            className={classes.btnGroup}
            exclusive={exclusive}
        >
            {items.map((value, index) => {
                return (
                    <ToggleButton
                        key={index}
                        value={value}
                        aria-label={value}
                        className={classes.btn}
                    >
                        <CustomIcon variant={value} size="medium" />
                    </ToggleButton>
                );
            })}
        </ToggleButtonGroup>
    );
};

export default CustomToggleButtonGroup;
