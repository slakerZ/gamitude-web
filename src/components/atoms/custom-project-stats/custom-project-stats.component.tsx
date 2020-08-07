import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
// UI lab
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
// Components
import CustomIcon from "../custom-icon/custom-icon.component";
// Tooltip
import SelectBoostedStatsTooltip from "../../../tooltips/stats/selectBoosted.tooltip";

const CustomProjectStats = ({
    groupValue,
    groupOnChange,
    dominant,
}: {
    groupValue: string;
    groupOnChange: Function;
    dominant: string;
}) => {
    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            flexDirection: "column",
        },
        btnGroup: {
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "space-around",
        },
        btn: {
            "&.Mui-selected": {
                background: theme.palette.primary.light,
                "&:hover": {
                    background: theme.palette.primary.light,
                },
            },
        },
    }));
    const classes = useStyles();

    const handleChange = (e: any, newBoosted: string) => {
        if (newBoosted.includes(dominant) || dominant.length === 0) {
            groupOnChange(newBoosted);
        }
    };

    return (
        <div className={classes.container}>
            <Tooltip title={<SelectBoostedStatsTooltip />} placement="left">
                <Typography component="h4" variant="h4" align="center">
                    Select stats that this projects boosts
                </Typography>
            </Tooltip>
            <ToggleButtonGroup
                value={groupValue}
                onChange={handleChange}
                aria-label="boosted stats"
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

export default CustomProjectStats;
