import * as types from "./types";
import { firebase } from "../index";
import { assureUserProfile, getUserProfile } from "./profile";
const providers = {
    google: () => new firebase.auth.GoogleAuthProvider().addScope("email"),
};

const methodIdToProvider = {
    [firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD]: providers.google,
};

const linkEmailPasswordCredentials = async (email, password) => {
    try {
        const providers = (
            await firebase.auth().fetchSignInMethodsForEmail(email)
        )
            .map(v => methodIdToProvider[v])
            .filter(v => v);
        const { user } = await firebase.auth().signInWithPopup(providers[0]());
        const credential = firebase.auth.EmailAuthProvider.credential(
            email,
            password
        );
        const {
            user: linkedUser,
        } = await user.linkAndRetrieveDataWithCredential(credential);
        return { user: linkedUser };
    } catch (err) {
        return { error: err };
    }
};

const linkFederatedCredentials = async (email, credential) => {
    try {
        const providers = (
            await firebase.auth().fetchSignInMethodsForEmail(email)
        )
            .map(v => methodIdToProvider[v])
            .filter(v => v);
        if (!providers.length)
            return {
                error: {
                    message: "User already exists. Login with email/password.",
                },
            };
        const existingCred = await firebase
            .auth()
            .signInWithPopup(providers[0]());
        const {
            user,
        } = await existingCred.user.linkAndRetrieveDataWithCredential(
            credential
        );
        return { user };
    } catch (err) {
        return { error: err };
    }
};

export const register = ({ email, password, provider }) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const auth = firebase.auth();
        const sdk = getState().sdk;
        try {
            const { user } = provider
                ? await auth.signInWithPopup(providers[provider]())
                : await auth.createUserWithEmailAndPassword(email, password);
            const userProfile = await assureUserProfile(user, sdk);
            dispatch({ type: types.AUTH_REGISTER_SUCCESS, userProfile });
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                // tries to create email/password account, exists with different provider
                return linkEmailPasswordCredentials(email, password);
            } else if (
                error.code === "auth/account-exists-with-different-credential"
            ) {
                return linkFederatedCredentials(error.email, error.credential);
            }
            return { error };
        }
    };
};

export const login = (user, sdk) => {
    console.log(user);
    return async dispatch => {
        //set firebase user
        dispatch({ type: types.AUTH_LOGIN_SUCCESS, user });
        if (sdk) {
            const userProfile = await getUserProfile(user.uid, sdk);
            if (!userProfile) {
                return dispatch({
                    type: types.USER_FETCH_FAILED,
                    message: "Error getting profile",
                });
            }
            dispatch({ type: types.USER_FETCH_SUCCESS, userProfile });
        }
    };
};

export const signIn = ({ email, password, provider }) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const loginFunc = provider
            ? () => firebase.auth().signInWithPopup(providers[provider]())
            : () =>
                  email &&
                  password &&
                  firebase.auth().signInWithEmailAndPassword(email, password);
        try {
            const user = await loginFunc();
            return user;
        } catch (error) {
            dispatch({ type: types.AUTH_LOGIN_FAILED, error });
            return { error };
        }
    };
};

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: types.AUTH_LOGOUT });
            });
    };
};

export const startAuthListener = () => (
    dispatch,
    getState,
    { getFirebase }
) => {
    const firebase = getFirebase();
    const sdk = getState().sdk;
    firebase.auth().onAuthStateChanged(user => {
        return user ? dispatch(login(user, sdk)) : null;
    });
};
