import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useUpdateEffect, useAsyncFn, useEffectOnce } from "react-use";
// API
import { headers, url } from "../../../api/rank.api";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Components
import RankImage from "../../atoms/rank-image/rank-image.component";
import RankTier from "../../atoms/rank-tier/rank-tier.component";
import RankName from "../../atoms/rank-name/rank-name.component";
import RankColors from "../../atoms/rank-colors/rank-colors.component";
// Selectors
import { selectToken } from "../../../redux/user/user.selectors";
import { selectSessionsComplete } from "../../../redux/session/session.selectors";

const Rank = ({
    token,
    sessionsComplete,
}: {
    token: string;
    sessionsComplete: number;
}) => {
    const [rank, setRank] = useState({
        name: "xd",
        tier: "f",
        imageUrl: "",
        rankFortes: ["intelligence", "creativity"],
    });

    const [state, submit] = useAsyncFn(async () => {
        const response = await axios.get(url, headers(token));
        const result = await response.data.data;
        setRank({
            name: result.name,
            tier: result.tier,
            imageUrl: result.imageUrl,
            rankFortes: ["intelligence", "creativity", "fluency", "strength"],
        });
        return result;
    }, [url]);

    useEffectOnce(() => {
        submit();
    });

    useUpdateEffect(() => {
        submit();
    }, [sessionsComplete]);

    const useStyles = makeStyles((theme) => {
        const gradientFromFortes = () => {
            const colors: any[] = [];
            rank.rankFortes.forEach((el) => {
                switch (el) {
                    case "strength":
                        colors.push(theme.palette.primary.main);
                        break;
                    case "creativity":
                        colors.push(theme.palette.primary.main);
                        break;
                    case "intelligence":
                        colors.push(theme.palette.primary.main);
                        break;
                    case "fluency":
                        colors.push(theme.palette.primary.main);
                        break;
                    default:
                        break;
                }
            });

            return colors;
        };
        return {
            rank: {
                backgroundColor: `${gradientFromFortes()[0]}`,
                backgroundImage: `linear-gradient(to right, ${gradientFromFortes().join(
                    ",",
                )})`,
                boxShadow: "2px 2px 10px #000000",
                borderRadius: "15px",
                gridArea: "rank",
                display: "grid",
                gap: "1rem",
                padding: "5px",
                border: "solid 10px black",

                [theme.breakpoints.down("lg")]: {
                    gridTemplateColumns: "15px 3fr 80px 3fr 15px",
                    gridTemplateRows: "1fr 150px 1fr 1fr 80px",
                    gridTemplateAreas: `
                        ". rank-name rank-name rank-name ."
                        ". rank-img rank-img rank-img ."
                        ". rank-displays rank-displays rank-displays ."
                        ". rank-colors rank-colors rank-colors ."
                        ". . rank-tier . ."  
                    `,
                },

                [theme.breakpoints.up("lg")]: {
                    gridTemplateColumns: "15px 3fr 80px 3fr 15px",
                    gridTemplateRows: "2fr 350px 1fr 6fr 80px",
                    gridTemplateAreas: `
                        ". rank-name rank-name rank-name ."
                        ". rank-img rank-img rank-img ."
                        ". rank-displays rank-displays rank-displays ."
                        ". rank-colors rank-colors rank-colors ."
                        ". . rank-tier . ."  
                    `,
                },
            },
        };
    });
    const classes = useStyles();

    return (
        <div className={classes.rank}>
            <RankImage rankImage={rank.imageUrl} state={state} />
            <RankTier rankTier={rank.tier} />
            <RankName rankName={rank.name} />
            <RankColors rankFortes={rank.rankFortes} />
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    token: selectToken(state),
    sessionsComplete: selectSessionsComplete(state),
});

export default connect(mapStateToProps)(Rank);
