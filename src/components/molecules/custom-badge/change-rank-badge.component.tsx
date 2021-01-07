import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useAsyncFn, useEffectOnce } from "react-use";

import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import { getUsersRanks, postRankSelection } from "api/rank/rank.api";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import CustomDialog from "../custom-dialog/custom-dialog.component";
import useCustomBadgeStyles from "./styles";

const ChangeRankBadge = ({ children, token, setRank }: any) => {
    const classes = useCustomBadgeStyles();

    const [isRankChangeDialogOpen, setIsRankChangeDialogOpen] = useState(false);
    const [userRanks, setUserRanks] = useState<any>([]);
    const [selectedRank, setSelectedRank] = useState<string | null>(null);

    const [fetchUserRanksState, fetchUserRanks] = useAsyncFn(async () => {
        const result = await getUsersRanks(token);
        setUserRanks(result.data);
        return result;
    });

    const [changeRankState, changeRank] = useAsyncFn(async () => {
        const rankId = selectedRank ? selectedRank : "";
        const result = await postRankSelection(token, rankId);
        setRank(result.data);
        setIsRankChangeDialogOpen(false);
        return result;
    }, [selectedRank]);

    const handleRankSelection = (
        event: React.MouseEvent<HTMLElement>,
        newRank: string | null,
    ) => {
        setSelectedRank(newRank);
    };

    const handleRankSettingsOpen = () => {
        setIsRankChangeDialogOpen(true);
    };

    useEffectOnce(() => {
        fetchUserRanks();
    });

    useEffect(() => {
        if (fetchUserRanksState.error) {
            setSnackbarState({
                message: "Failed to retrieve your ranks",
                severity: "error",
                open: true,
                autoHideDuration: 3000,
            });
        }
    }, [fetchUserRanksState]);

    useEffect(() => {
        if (changeRankState.error) {
            setSnackbarState({
                message: "Failed to change rank",
                severity: "error",
                open: true,
                autoHideDuration: 3000,
            });
        }
    }, [changeRankState]);

    return (
        <Fragment>
            <CustomDialog
                open={isRankChangeDialogOpen}
                setOpen={setIsRankChangeDialogOpen}
                title={"Select rank to display"}
                onSubmit={changeRank}
            >
                <ToggleButtonGroup
                    exclusive
                    value={selectedRank}
                    onChange={handleRankSelection}
                    aria-label="selected rank"
                    className={classes.ranksWrapper}
                >
                    {userRanks.map(({ imageUrl, id, name }: any) => {
                        return (
                            <ToggleButton
                                value={id}
                                key={id}
                                aria-label={`${name} rank`}
                            >
                                <Tooltip
                                    title={
                                        <Typography
                                            variant="h5"
                                            component={"h5"}
                                        >
                                            {name}
                                        </Typography>
                                    }
                                >
                                    <Avatar
                                        src={imageUrl}
                                        imgProps={{ width: 40, height: 40 }}
                                    />
                                </Tooltip>
                            </ToggleButton>
                        );
                    })}
                </ToggleButtonGroup>
            </CustomDialog>
            <Badge
                aria-label="Rank settings badge"
                overlap="circle"
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                badgeContent={
                    <ToggleAbleTooltip target="rankChange" placement="left">
                        <div className={classes.badgeWrapper}>
                            <IconButton
                                aria-label="rank settings"
                                onClick={handleRankSettingsOpen}
                            >
                                <CustomIcon variant="settings" size="small" />
                            </IconButton>
                        </div>
                    </ToggleAbleTooltip>
                }
            >
                {children}
            </Badge>
        </Fragment>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
});

export default connect(mapStateToProps)(ChangeRankBadge);
