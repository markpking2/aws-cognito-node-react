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
    },
});
