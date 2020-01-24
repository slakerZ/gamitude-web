import firebase from "firebase/app";
import "firebase/auth";
import devFirebaseConfig from "./devConfig";

// AUTH STATUSES
export const AUTH_UNKNOWN = "auth-unknown";
export const AUTH_LOGGED_IN = "auth-logged-in";
export const AUTH_LOGGED_OUT = "auth-logged-out";
export const AUTH_LOGIN_FAILED = "auth-login-failed";
export const AUTH_REGISTER_FAILED = "auth-register-failed";

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || devFirebaseConfig.apiKey,
    authDomain: "gamitude-b2a6d.firebaseapp.com",
    databaseURL: "https://gamitude-b2a6d.firebaseio.com",
    projectId: "gamitude-b2a6d",
    storageBucket: "gamitude-b2a6d.appspot.com",
    messagingSenderId:
        process.env.FIREBASE_MSG_ID || devFirebaseConfig.messagingSenderId,
    appId: process.env.FIREBASE_APP_ID || devFirebaseConfig.appId,
};

export const errorCodes = {
    invalidEmail: "invalid-email",
    userNotFound: "auth/user-not-found",
    wrongPassword: "auth/wrong-password",
    unverifiedEmail: "unverified-email",
    accountExists: "auth/account-exists-with-different-credential",
    emailInUse: "auth/email-already-in-use",
};

// Firebase IO endpoint
export const FIREBASE_IO = "https://reduxfirebase.firebaseio.com/";

firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();

export { firebase };
