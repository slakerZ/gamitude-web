import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SessionTypeSwitch from "../../atoms/session-type-switch/session-type-switch.component";
import CustomToggleButtonGroup from "../../atoms/custom-toggle-button-group/custom-toggle-button-group.component";
import { BoostedDominantBtnGroupPropTypes } from "../../atoms/custom-toggle-button-group/types";
import useBoostedDominantBtnGroupStyles from "./styles";
import { STATS, ENERGIES } from "../../../constants";

const BoostedDominantBtnGroup = ({
    boosted,
    dominant,
    setBoosted,
    setDominant,
    name,
    setName,
    sessionType,
    setSessionType,
}: BoostedDominantBtnGroupPropTypes) => {
    const classes = useBoostedDominantBtnGroupStyles();

    const handleNameChange = (event: { target: { value: string } }) => {
        setName(event.target.value);
    };

    const handleChangeStats = (event: MouseEvent, newBoosted: string[]) => {
        if (newBoosted.includes(dominant) || dominant.length === 0) {
            setBoosted(newBoosted);
        }
    };

    const handleChangeDominant = (event: MouseEvent, newDominant: string) => {
        if (boosted.includes(newDominant)) {
            setDominant(newDominant);
        }
    };

    return (
        <div aria-label={"Boosted Stats / Energies"}>
            <TextField
                label="PROJECT NAME"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
                fullWidth
            />
            <SessionTypeSwitch
                sessionType={sessionType}
                setSessionType={setSessionType}
            />
            <div
                aria-label={"Boosted Stats / Energies"}
                className={classes.container}
            >
                <Typography component="h4" variant="h4" align="center">
                    {sessionType === "STAT"
                        ? "Select stats that this projects boosts"
                        : "Select energies that this project restores"}
                </Typography>
                {sessionType === "STAT" ? (
                    <CustomToggleButtonGroup
                        value={boosted}
                        handleChange={handleChangeStats}
                        items={STATS}
                    />
                ) : (
                    <CustomToggleButtonGroup
                        value={boosted}
                        handleChange={handleChangeStats}
                        items={ENERGIES}
                    />
                )}
            </div>
            <div
                aria-label={"Dominant Stats / Energies"}
                className={classes.container}
            >
                <Typography variant="h4" component="h4" align="center">
                    {sessionType === "STAT"
                        ? "Select the dominant stat"
                        : "Select the most restored energy"}
                </Typography>
                {sessionType === "STAT" ? (
                    <CustomToggleButtonGroup
                        value={dominant}
                        handleChange={handleChangeDominant}
                        items={STATS}
                        exclusive={true}
                    />
                ) : (
                    <CustomToggleButtonGroup
                        value={dominant}
                        handleChange={handleChangeDominant}
                        items={ENERGIES}
                        exclusive={true}
                    />
                )}
            </div>
        </div>
    );
};
export default BoostedDominantBtnGroup;
