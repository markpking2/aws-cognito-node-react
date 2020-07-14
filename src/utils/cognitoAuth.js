import cognitoConfig from "../config/cognitoConfig.json";
import Amplify, { Auth } from "aws-amplify";
// import {CustomChromeStorage} from '../utils/customChromeStorage'

Amplify.configure({
    Auth: {
        userPoolId: cognitoConfig.userPool,
        userPoolWebClientId: cognitoConfig.clientId,
        region: cognitoConfig.region,
        oauth: {
            domain: cognitoConfig.userPoolBaseUri,
            scope: cognitoConfig.tokenScopes,
            redirectSignIn: cognitoConfig.callbackUri,
            redirectSignOut: cognitoConfig.signoutUri,
            responseType: "code",
        },
        // storage: CustomChromeStorage
    },
});

async function signUp(email, password) {
    return await Auth.signUp({
        username: email,
        password,
    });
}

async function signIn(email, password) {
    return await Auth.signIn(email, password);
}

async function confirmSignUp(email, code) {
    return await Auth.confirmSignUp(email, code);
}

async function resendConfirmationCode(username) {
    return await Auth.resendSignUp(username);
}

// pass in true to sign out from all devices
async function signOut(global = false) {
    return await Auth.signOut({ global });
}

async function federatedSignIn(provider) {
    return await Auth.federatedSignIn({ provider });
}

async function forgotPassword(email) {
    return await Auth.forgotPassword(email);
}

async function forgotPasswordSubmit(email, code, newPassword) {
    try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);
        return "Password was changed successfully.";
    } catch (err) {
        throw err;
    }
}

async function changePassword(oldPassword, newPassword) {
    try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(user, oldPassword, newPassword);
        return "Password was changed successfully.";
    } catch (err) {
        throw err;
    }
}

function getIdToken() {
    return new Promise((resolve, reject) => {
        Auth.currentSession()
            .then((data) => {
                const idToken = data.getIdToken();
                resolve(idToken.jwtToken);
            })
            .catch(() => {
                reject(Error("Not signed in."));
            });
    });
}

function getCurrentUser() {
    return new Promise((resolve, reject) => {
        Auth.currentSession()
            .then((data) => {
                const idToken = data.getIdToken();
                const user = idToken.payload;
                resolve(user);
            })
            .catch(() => {
                reject(Error("Not signed in."));
            });
    });
}

export {
    signUp,
    signIn,
    confirmSignUp,
    resendConfirmationCode,
    signOut,
    federatedSignIn,
    forgotPassword,
    forgotPasswordSubmit,
    getIdToken,
    changePassword,
    getCurrentUser,
};
