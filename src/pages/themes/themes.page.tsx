import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useAsyncFn, useEffectOnce } from "react-use";

import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { setUserFlag } from "redux/user/user.actions";
import { selectToken, selectUser } from "redux/user/user.selectors";

import { getRanks as getRanksApi, postRankPurchase } from "api/rank/rank.api";
import { RankType } from "api/rank/types";
import { getOwnMoney } from "api/users/users.api";

import CustomIconWithTypography from "components/atoms/custom-icon-with-typography/custom-icon-with-typography.component";
import CustomIcon from "components/atoms/custom-icon/custom-icon.component";

import { TiersMapper, PricesMapper } from "./constants";
import useThemesPageStyles from "./styles";
import { ThemesPagePropTypes, FilterType, ActionType } from "./types";

const ThemesPage = ({
    token,
    setSnackbarState,
    setUser,
    user,
}: ThemesPagePropTypes) => {
    const classes = useThemesPageStyles();

    // useState
    const [money, setMoney] = useState(0);
    const [itemsCategory, setItemsCategory] = useState("ranks");
    const [shopItems, setShopItems] = useState<any>([]);
    const [shopPage, setShopPage] = useState(1);

    // useAsyncFn
    const [getRanksState, getRanks] = useAsyncFn(async (pageNum: number) => {
        const response = await getRanksApi(token, pageNum, 8, "name");
        setShopItems(response.data);
        return response;
    });

    const [getMoneyState, getMoney] = useAsyncFn(async () => {
        const response = await getOwnMoney(token);
        setMoney(response.data);
        return response.data;
    });

    const [buyRankState, buyRank] = useAsyncFn(async (rankId: string) => {
        const response = await postRankPurchase(token, rankId, "STATS");
        const result = await response.data;
        setSnackbarState({
            autoHideDuration: 3000,
            message: "Successfully bought rank",
            open: true,
            severity: "success",
        });
        setUser(!user);

        return result;
    });

    // useReducer
    const checkedTiersReducer = (state: FilterType, action: ActionType) => {
        switch (action.type) {
            case "s":
                return { ...state, s: action.payload };
            case "a":
                return { ...state, a: action.payload };
            case "b":
                return { ...state, b: action.payload };
            case "c":
                return { ...state, c: action.payload };
            case "d":
                return { ...state, d: action.payload };
            case "e":
                return { ...state, e: action.payload };
            case "f":
                return { ...state, f: action.payload };
            case "str":
                return { ...state, str: action.payload };
            case "crt":
                return { ...state, crt: action.payload };
            case "int":
                return { ...state, int: action.payload };
            case "flc":
                return { ...state, flc: action.payload };
            case "cash":
                return { ...state, cash: action.payload };
            default:
                return state;
        }
    };

    const [filters, dispatchFilter] = useReducer(checkedTiersReducer, {
        s: true,
        a: true,
        b: true,
        c: true,
        d: true,
        e: true,
        f: true,
        str: true,
        crt: true,
        int: true,
        flc: true,
        cash: true,
    });

    // handlers
    const handleCategoryChange = (e: any, newValue: string) => {
        setItemsCategory(newValue);
    };

    const handleChangeCheckedTiers = (e: any, newValue: boolean) => {
        dispatchFilter({ payload: newValue, type: e.target.value });
    };

    const handleBuy = (id: string, name: string) => {
        buyRank(id);
    };

    const handlePageChange = (event: any, page: number): void => {
        setShopPage(page);
        getRanks(page);
    };

    // useEffect
    useEffectOnce(() => {
        getRanks(1);
        getMoney();
    });

    useEffect(() => {
        if (getMoneyState.error) {
            setSnackbarState({
                autoHideDuration: 3000,
                message: "Failed to get your account balance",
                open: true,
                severity: "error",
            });
        }
    }, [getMoneyState, setSnackbarState]);

    useEffect(() => {
        if (getRanksState.error) {
            setSnackbarState({
                autoHideDuration: 3000,
                message: "Failed to get ranks",
                open: true,
                severity: "error",
            });
        }
    }, [getRanksState, setSnackbarState]);

    useEffect(() => {
        if (buyRankState.error) {
            setSnackbarState({
                autoHideDuration: 3000,
                message: "Failed to buy rank",
                open: true,
                severity: "error",
            });
        }
    }, [buyRankState, setSnackbarState]);

    return (
        <Fragment>
            <Helmet>
                <title>{"Gamitude | Themes"}</title>
            </Helmet>
            <Grid
                container
                className={classes.root}
                aria-label="Shop with themes"
            >
                <Grid
                    item
                    xs={3}
                    className={classes.shopFilters}
                    aria-label="Items filterer"
                >
                    <div className={classes.shopFiltersBody}>
                        <div>
                            <CustomIconWithTypography
                                iconVariant={"money"}
                                variant={"h4"}
                                iconSize={"small"}
                            >
                                {money.toString()}
                            </CustomIconWithTypography>
                        </div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">
                                {"Selected Category"}
                            </FormLabel>
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
                        <div aria-label="Tier filter">
                            <Typography variant="h4" component="h4">
                                {"Tiers"}
                            </Typography>
                            <div aria-label="Tiers">
                                {TiersMapper(filters).map(
                                    (
                                        { checked, name, value, label },
                                        index,
                                    ) => {
                                        return (
                                            <FormControlLabel
                                                key={index}
                                                control={
                                                    <Checkbox
                                                        checked={checked}
                                                        onChange={
                                                            handleChangeCheckedTiers
                                                        }
                                                        name={name}
                                                        color="primary"
                                                        value={value}
                                                    />
                                                }
                                                label={label}
                                            />
                                        );
                                    },
                                )}
                            </div>
                        </div>
                        <div aria-label="Price filter">
                            <Typography variant="h4" component="h4">
                                {"Price"}
                            </Typography>
                            <div aria-label="Prices">
                                {PricesMapper(filters).map(
                                    (
                                        { checked, name, value, label },
                                        index,
                                    ) => {
                                        return (
                                            <FormControlLabel
                                                key={index}
                                                control={
                                                    <Checkbox
                                                        checked={checked}
                                                        onChange={
                                                            handleChangeCheckedTiers
                                                        }
                                                        name={name}
                                                        color="primary"
                                                        value={value}
                                                    />
                                                }
                                                label={label}
                                            />
                                        );
                                    },
                                )}
                            </div>
                        </div>
                        <Pagination
                            count={4}
                            color="secondary"
                            className={classes.pagination}
                            onChange={handlePageChange}
                            page={shopPage}
                        />
                    </div>
                </Grid>
                <Grid item xs={9} className={classes.shopItems}>
                    <Grid container spacing={2}>
                        {getRanksState.loading ? (
                            <div className={classes.center}>
                                <CircularProgress
                                    className={classes.progress}
                                />
                            </div>
                        ) : (
                            shopItems.map(
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
                                    }: RankType,
                                    index: number,
                                ) => {
                                    return (
                                        <Grid key={index} item xs={3}>
                                            <Card className={classes.card}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={
                                                            classes.media
                                                        }
                                                        image={imageUrl}
                                                        title={name}
                                                    />
                                                    <CardContent>
                                                        <div
                                                            className={
                                                                classes.flexRow
                                                            }
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
                                                                iconVariant={
                                                                    "strength"
                                                                }
                                                                variant={"h4"}
                                                                iconSize={
                                                                    "xsmall"
                                                                }
                                                            >
                                                                {priceStrength.toString()}
                                                            </CustomIconWithTypography>
                                                            <CustomIconWithTypography
                                                                iconVariant={
                                                                    "creativity"
                                                                }
                                                                variant={"h4"}
                                                                iconSize={
                                                                    "xsmall"
                                                                }
                                                            >
                                                                {priceCreativity.toString()}
                                                            </CustomIconWithTypography>
                                                            <CustomIconWithTypography
                                                                iconVariant={
                                                                    "intelligence"
                                                                }
                                                                variant={"h4"}
                                                                iconSize={
                                                                    "xsmall"
                                                                }
                                                            >
                                                                {priceIntelligence.toString()}
                                                            </CustomIconWithTypography>
                                                            <CustomIconWithTypography
                                                                iconVariant={
                                                                    "fluency"
                                                                }
                                                                variant={"h4"}
                                                                iconSize={
                                                                    "xsmall"
                                                                }
                                                            >
                                                                {priceFluency.toString()}
                                                            </CustomIconWithTypography>
                                                            {/* <CustomIconWithTypography
                                                                iconVariant={
                                                                    "money"
                                                                }
                                                                variant={"h4"}
                                                            >
                                                                {priceEuro.toString()}
                                                            </CustomIconWithTypography> */}
                                                        </div>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button
                                                        size="small"
                                                        onClick={() =>
                                                            handleBuy(id, name)
                                                        }
                                                        aria-label="Buy item"
                                                        variant="outlined"
                                                        color="secondary"
                                                        className={
                                                            classes.buyButton
                                                        }
                                                    >
                                                        {"Buy"}
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    );
                                },
                            )
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
    user: selectUser(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
    setUser: (value: any) => dispatch(setUserFlag(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemesPage);
