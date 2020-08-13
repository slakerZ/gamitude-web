import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// UI lab
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
// Components
import CustomIcon from "../custom-icon/custom-icon.component";

const CustomProjectStatsDominant = ({
    groupValue,
    groupOnChange,
    boosted,
}: {
    groupValue: string;
    groupOnChange: Function;
    boosted: string[];
}) => {
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
                background: theme.palette.primary.main,
                "&:hover": {
                    background: theme.palette.primary.light,
                },
            },
        },
    }));
    const classes = useStyles();

    const handleChange = (event: any, newDominant: string) => {
        if (boosted.includes(newDominant)) {
            groupOnChange(newDominant);
        }
    };

    return (
        <div className={classes.container}>
            <Typography variant="h4" component="h4" align="center">
                Select the dominant stat
            </Typography>
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
