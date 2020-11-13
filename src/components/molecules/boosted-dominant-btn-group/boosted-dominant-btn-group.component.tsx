import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SessionTypeSwitch from "../../atoms/session-type-switch/session-type-switch.component";
import CustomToggleButtonGroup from "../../atoms/custom-toggle-button-group/custom-toggle-button-group.component";
import useBoostedDominantBtnGroupStyles from "./styles";
import { STATS, ENERGIES } from "../../../constants";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { selectFolders } from "../../../redux/folders/folders.selectors";
import { selectTimers } from "../../../redux/timers/timers.selectors";
import { BoostedDominantBtnGroupPropTypes } from "./types";
import { ReduxStateType } from "../../../redux/root.reducer";

const BoostedDominantBtnGroup = ({
    boosted,
    dominant,
    setBoosted,
    setDominant,
    name,
    setName,
    sessionType,
    setSessionType,
    folders,
    folder,
    setFolder,
    methods,
    method,
    setMethod,
}: BoostedDominantBtnGroupPropTypes) => {
    const classes = useBoostedDominantBtnGroupStyles();

    const handleNameChange = (event: any) => {
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

    const handleFolderChange = (event: any) => {
        setFolder(event.target.value);
    };

    const handleDefaultMethodChange = (event: any) => {
        setMethod(event.target.value);
    };

    return (
        <div className={classes.root} aria-label={"Boosted Stats / Energies"}>
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
                setBoosted={setBoosted}
                setDominant={setDominant}
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
            <TextField
                aria-label="Select Folder"
                label="FOLDER"
                select
                variant="outlined"
                value={folder}
                onChange={handleFolderChange}
                fullWidth
            >
                {folders.map(({ name, id }, index) => {
                    return (
                        <MenuItem key={index} value={id}>
                            {name}
                        </MenuItem>
                    );
                })}
            </TextField>
            <TextField
                aria-label="Select Default Method"
                label="DEFAULT METHOD"
                select
                variant="outlined"
                value={method}
                onChange={handleDefaultMethodChange}
                fullWidth
            >
                {methods.map(({ name, id }, index) => {
                    return (
                        <MenuItem key={index} value={id}>
                            {name}
                        </MenuItem>
                    );
                })}
            </TextField>
        </div>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    folders: selectFolders(state),
    methods: selectTimers(state),
});

export default connect(mapStateToProps)(BoostedDominantBtnGroup);
