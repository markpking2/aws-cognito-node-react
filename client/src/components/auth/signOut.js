import React from "react";
import { signOut } from "../../utils/cognitoAuth";

export default function SignOut() {
    return (
        <>
            <button
                onClick={() => {
                    signOut();
                }}
            >
                Log out
            </button>
        </>
    );
}
