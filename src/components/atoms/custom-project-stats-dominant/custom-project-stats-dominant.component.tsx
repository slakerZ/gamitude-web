import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
// UI lab
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
// Components
import CustomIcon from "../custom-icon/custom-icon.component";
// Tooltips
import SelectDominantStatTooltip from "../../../tooltips/stats/selectDominant.tooltip";

const CustomProjectStatsDominant = ({ groupValue, groupOnChange, boosted }) => {
    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
        },
        btnGroup: {
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "space-around",
        },
        btn: {
            "&.Mui-selected": {
                background: theme.palette.complement.lighter,
                "&:hover": {
                    background: theme.palette.complement.light,
                },
            },
        },
    }));
    const classes = useStyles();

    const handleChange = (event, newDominant) => {
        if (boosted.includes(newDominant)) {
            groupOnChange(newDominant);
        }
    };

    return (
        <div className={classes.container}>
            <Tooltip title={<SelectDominantStatTooltip />} placement="left">
                <Typography variant="h4" component="h4" align="center">
                    Select the dominant stat
                </Typography>
            </Tooltip>
            <ToggleButtonGroup
                value={groupValue}
                exclusive
                onChange={handleChange}
                aria-label="dominant stat"
                className={classes.btnGroup}
            >
                <ToggleButton
                    value="strength"
                    aria-label="strength"
                    className={classes.btn}
                >
                    <CustomIcon variant="strength" size="medium" />
                </ToggleButton>

                <ToggleButton
                    value="creativity"
                    aria-label="creativity"
                    className={classes.btn}
                >
                    <CustomIcon variant="creativity" size="medium" />
                </ToggleButton>

                <ToggleButton
                    value="intelligence"
                    aria-label="intelligence"
                    className={classes.btn}
                >
                    <CustomIcon variant="intelligence" size="medium" />
                </ToggleButton>

                <ToggleButton
                    value="fluency"
                    aria-label="fluency"
                    className={classes.btn}
                >
                    <CustomIcon variant="fluency" size="medium" />
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default CustomProjectStatsDominant;
