import React, { useState } from "react";
import { confirmSignUp } from "../../utils/cognitoAuth";

export default function VerifyEmailWithCode() {
    const [verifyEmail, setVerifyEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

    function handleVerification(e) {
        e.preventDefault();
        confirmSignUp(verifyEmail, verificationCode)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    return (
        <>
            <h3>Verify Email With Code</h3>
            <form onSubmit={handleVerification}>
                <input
                    placeholder="email"
                    onChange={(e) => setVerifyEmail(e.target.value)}
                    value={verifyEmail}
                />
                <input
                    onChange={(e) => setVerificationCode(e.target.value)}
                    value={verificationCode}
                    placeholder="verification code"
                />
                <button>Submit</button>
            </form>
        </>
    );
}
