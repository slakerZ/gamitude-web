import React, {
    Fragment,
    lazy,
    ReactElement,
    useEffect,
    useState,
} from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAsyncFn, useEffectOnce } from "react-use";

import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { setUser } from "redux/user/user.actions";
import { selectToken, selectUserId } from "redux/user/user.selectors";

import {
    changeOwnPassword,
    getOwnDetails,
    putOwnDetails,
    deleteOwnAccount,
} from "api/users/users.api";

import ComingSoon from "components/atoms/coming-soon/coming-soon.component";
import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import FormikForm from "components/atoms/formik-form/formik-form.component";
import {
    TabPanel,
    a11yProps,
} from "components/atoms/tab-panel/tab-panel.component";

import {
    ChangePasswordSchema,
    ChangePasswordInitialValues,
    ChangePasswordFields,
} from "./change-password.schema";
import { PROFILE_TABS } from "./constants";
import {
    EditDetailsSchema,
    EditDetailsFields,
    EditDetailsInitialValues,
} from "./edit-details.schema";
import useProfilePageStyles from "./styles";
import { ProfilePagePropTypes } from "./types";

const DeleteAccountDialog = lazy(
    () =>
        import(
            "components/molecules/custom-dialog/delete-account-dialog.component"
        ),
);

const ProfilePage = ({
    userId,
    token,
    setSnackbarState,
    setUser,
}: ProfilePagePropTypes): ReactElement => {
    const classes = useProfilePageStyles();
    const history = useHistory();

    // useAsyncFn
    const [changePasswordState, changePassword] = useAsyncFn(
        async (values, { resetForm }) => {
            const requestBody = { ...values };
            const result = await changeOwnPassword(token, requestBody);
            setSnackbarState({
                autoHideDuration: 3000,
                message: "Successfully changed password",
                open: true,
                severity: "success",
            });
            resetForm();
            return result;
        },
        [token, userId],
    );

    const [getUserState, getUser] = useAsyncFn(async () => {
        const result = await getOwnDetails(token);
        const initVals = {
            email: result.data.email,
            userName: result.data.userName,
        };
        setEditDetailsInitialValues(initVals);
        return result;
    }, [userId, token]);

    const [editUserDetailsState, editUserDetails] = useAsyncFn(
        async (values, { resetForm }) => {
            const requestBody = { ...values };
            const result = await putOwnDetails(token, requestBody);
            setSnackbarState({
                autoHideDuration: 3000,
                message: "Successfully changed user details",
                open: true,
                severity: "success",
            });
            resetForm();
            return result;
        },
        [userId, token],
    );

    const [deleteAccountState, deleteAccount] = useAsyncFn(async () => {
        const result = await deleteOwnAccount(token);
        setIsDeleteAccountDialogOpen(false);
        history.push("/");
        setUser({ token: null });
        return result;
    }, [userId, token]);

    // useState
    const [currTab, setCurrTab] = useState(0);
    const [editDetailsInitialValues, setEditDetailsInitialValues] = useState(
        EditDetailsInitialValues,
    );
    const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(
        false,
    );

    // handlers
    const handleTabChange = (e: any, newValue: number) => {
        setCurrTab(newValue);
    };

    const handleDeleteAccount = () => {
        setIsDeleteAccountDialogOpen(true);
    };

    // useEffect
    useEffect(() => {
        if (changePasswordState.error) {
            setSnackbarState({
                autoHideDuration: 3000,
                message: "Failed to change password",
                open: true,
                severity: "error",
            });
        }
    }, [changePasswordState, setSnackbarState]);

    useEffect(() => {
        if (deleteAccountState.error) {
            setSnackbarState({
                autoHideDuration: 3000,
                message: "Failed to delete account",
                open: true,
                severity: "error",
            });
        }
    }, [deleteAccountState, setSnackbarState]);

    useEffect(() => {
        if (getUserState.error) {
            setSnackbarState({
                autoHideDuration: 3000,
                message: "Failed to get your details",
                open: true,
                severity: "error",
            });
        }
    }, [getUserState, setSnackbarState]);

    useEffect(() => {
        if (editUserDetailsState.error) {
            setSnackbarState({
                autoHideDuration: 3000,
                message: "Failed to edit account details",
                open: true,
                severity: "error",
            });
        }
    }, [editUserDetailsState, setSnackbarState]);

    useEffectOnce(() => {
        getUser();
    });

    return (
        <Fragment>
            <Helmet>
                <title>{"Gamitude | Settings"}</title>
            </Helmet>
            <DeleteAccountDialog
                open={isDeleteAccountDialogOpen}
                setOpen={setIsDeleteAccountDialogOpen}
                onSubmit={deleteAccount}
            />
            <div className={classes.root}>
                <div className={classes.tabsWrapper}>
                    <Tabs
                        value={currTab}
                        onChange={handleTabChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        orientation="vertical"
                        variant="scrollable"
                        aria-label="Profile page tabs"
                        className={classes.tabs}
                    >
                        {PROFILE_TABS.map(({ label, icon }, index) => {
                            return (
                                <Tab
                                    className={classes.tab}
                                    label={label}
                                    key={index}
                                    icon={
                                        <CustomIcon
                                            variant={icon}
                                            size="small"
                                        />
                                    }
                                    {...a11yProps(index, label)}
                                />
                            );
                        })}
                    </Tabs>
                </div>
                <div className={classes.container}>
                    <TabPanel
                        value={currTab}
                        index={0}
                        role={"form"}
                        id={`change-password`}
                    >
                        <FormikForm
                            title={"Change Password"}
                            initialValues={ChangePasswordInitialValues}
                            schema={ChangePasswordSchema}
                            fields={ChangePasswordFields}
                            onSubmit={changePassword}
                            state={changePasswordState}
                        />
                    </TabPanel>
                    <TabPanel
                        value={currTab}
                        index={1}
                        role={"form"}
                        id={`change-account-details`}
                    >
                        {false ? (
                            <Fragment>
                                <FormikForm
                                    enableReinitialize={true}
                                    title={"Edit account details"}
                                    initialValues={editDetailsInitialValues}
                                    schema={EditDetailsSchema}
                                    fields={EditDetailsFields}
                                    onSubmit={editUserDetails}
                                    state={editUserDetailsState}
                                />
                                <Button
                                    onClick={handleDeleteAccount}
                                    variant="contained"
                                    className={classes.dngButton}
                                >
                                    {"DELETE ACCOUNT"}
                                </Button>
                            </Fragment>
                        ) : (
                            <ComingSoon />
                        )}
                    </TabPanel>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    userId: selectUserId(state),
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
    setUser: (value: any) => dispatch(setUser(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
