import React, { useState } from "react";
import { resendConfirmationCode } from "../../utils/cognitoAuth";

export default function ResendVerificationCode() {
    const [resendEmail, setResendEmail] = useState("");
    function handleResendVerification(e) {
        e.preventDefault();
        resendConfirmationCode(resendEmail)
            .then((res) => console.log(res))
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <h3>Resend Confirmation Code</h3>
            <form onSubmit={handleResendVerification}>
                <input
                    required
                    placeholder="email"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                />
                <button>Re-send</button>
            </form>
        </>
    );
}
