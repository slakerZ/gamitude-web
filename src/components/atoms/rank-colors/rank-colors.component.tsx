import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Components
import CustomIcon from "../custom-icon/custom-icon.component";

const RankColors = ({ rankFortes }: { rankFortes: any }) => {
    const useStyles = makeStyles({
        rankColors: {
            margin: "auto",
            width: "50%",
            gridArea: "rank-colors",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexFlow: "row wrap",
            opacity: 0.2,
        },
    });
    const classes = useStyles();

    return (
        <div className={classes.rankColors}>
            {rankFortes.map((element: any) => {
                return (
                    <CustomIcon
                        key={rankFortes.indexOf(element)}
                        variant={element}
                        size="large"
                    />
                );
            })}
        </div>
    );
};

export default RankColors;
