import React, { useState } from "react";
import { connect } from "react-redux";
import { useAsyncFn, useEffectOnce } from "react-use";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";

import { ReduxStateType } from "redux/root.reducer";
import { selectToken } from "redux/user/user.selectors";

import { getRanks as getRanksApi } from "api/rank/rank.api";
import { FullRankType } from "api/rank/types";

import CustomIconWithTypography from "components/atoms/custom-icon-with-typography/custom-icon-with-typography.component";
import CustomIcon from "components/atoms/custom-icon/custom-icon.component";

import useThemesPageStyles from "./styles";
import { ThemesPagePropTypes } from "./types";

const ThemesPage = ({ token }: ThemesPagePropTypes) => {
    const classes = useThemesPageStyles();

    const [itemsCategory, setItemsCategory] = useState("ranks");
    const [shopItems, setShopItems] = useState<any>([]);

    const [getRanksState, getRanks] = useAsyncFn(async () => {
        const response = await getRanksApi(token, 1, 8, "name");
        setShopItems(response.data);
        return response;
    });

    const handleCategoryChange = (e: any, newValue: string) => {
        setItemsCategory(newValue);
    };

    const handleBuy = (id: any, name: any) => {
        console.log(id);
        console.log(name);
    };

    useEffectOnce(() => {
        getRanks();
    });

    return (
        <Grid container className={classes.root}>
            <Grid item xs={3} className={classes.shopFilter}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{"Items Type"}</FormLabel>
                    <RadioGroup
                        aria-label="items-category"
                        name="items-category"
                        value={itemsCategory}
                        onChange={handleCategoryChange}
                    >
                        <FormControlLabel
                            value="ranks"
                            control={<Radio />}
                            label="Ranks"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={9} className={classes.shopItems}>
                <Grid container spacing={1}>
                    {shopItems.map(
                        (
                            {
                                imageUrl,
                                name,
                                tier,
                                priceCreativity,
                                priceEuro,
                                priceStrength,
                                priceFluency,
                                priceIntelligence,
                                id,
                            }: FullRankType,
                            index: number,
                        ) => {
                            return (
                                <Grid key={index} item xs={3}>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={imageUrl}
                                                title={name}
                                            />
                                            <CardContent>
                                                <div
                                                    className={classes.flexRow}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        component="h4"
                                                    >
                                                        {name}
                                                    </Typography>
                                                    <CustomIcon
                                                        variant={tier.toLowerCase()}
                                                        size="xsmall"
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes.flexColumn
                                                    }
                                                >
                                                    <CustomIconWithTypography
                                                        iconVariant={"strength"}
                                                        variant={"h4"}
                                                        iconSize={"xsmall"}
                                                    >
                                                        {priceStrength.toString()}
                                                    </CustomIconWithTypography>
                                                    <CustomIconWithTypography
                                                        iconVariant={
                                                            "creativity"
                                                        }
                                                        variant={"h4"}
                                                        iconSize={"xsmall"}
                                                    >
                                                        {priceCreativity.toString()}
                                                    </CustomIconWithTypography>
                                                    <CustomIconWithTypography
                                                        iconVariant={
                                                            "intelligence"
                                                        }
                                                        variant={"h4"}
                                                        iconSize={"xsmall"}
                                                    >
                                                        {priceIntelligence.toString()}
                                                    </CustomIconWithTypography>
                                                    <CustomIconWithTypography
                                                        iconVariant={"fluency"}
                                                        variant={"h4"}
                                                        iconSize={"xsmall"}
                                                    >
                                                        {priceFluency.toString()}
                                                    </CustomIconWithTypography>
                                                    <CustomIconWithTypography
                                                        iconVariant={"money"}
                                                        variant={"h4"}
                                                    >
                                                        {priceEuro.toString()}
                                                    </CustomIconWithTypography>
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                onClick={() =>
                                                    handleBuy(id, name)
                                                }
                                            >
                                                {"Buy"}
                                            </Button>
                                            <Button size="small">
                                                {"View offer"}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        },
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
});

export default connect(mapStateToProps)(ThemesPage);
