import React, { useState } from "react";
import { forgotPasswordSubmit } from "../../utils/cognitoAuth";

export default function VerifyForgotPassword() {
    const [resetPasswordCode, setResetPasswordCode] = useState("");
    const [resetNewPassword, setResetNewPassword] = useState("");
    const [resetPasswordEmail, setResetPasswordEmail] = useState("");

    function handleForgotPasswordSubmit(e) {
        e.preventDefault();
        forgotPasswordSubmit(
            resetPasswordEmail,
            resetPasswordCode,
            resetNewPassword
        )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }
    return (
        <>
            <h3>Verify Forgot Password</h3>
            <form onSubmit={handleForgotPasswordSubmit}>
                <input
                    required
                    placeholder="email"
                    value={resetPasswordEmail}
                    onChange={(e) => setResetPasswordEmail(e.target.value)}
                />
                <input
                    required
                    placeholder="code"
                    value={resetPasswordCode}
                    onChange={(e) => setResetPasswordCode(e.target.value)}
                />
                <input
                    required
                    placeholder="new password"
                    value={resetNewPassword}
                    onChange={(e) => setResetNewPassword(e.target.value)}
                />
                <button>Submit</button>
            </form>
        </>
    );
}
