import React from "react";
import { federatedSignIn } from "../../utils/cognitoAuth";

export default function GoogleSignIn() {
    return (
        <>
            <h3>Google Sign In</h3>
            <button onClick={() => federatedSignIn("Google")}>
                Login/Register with Google
            </button>
        </>
    );
}
