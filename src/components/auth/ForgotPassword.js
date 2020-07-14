import React, { useState } from "react";
import { forgotPassword } from "../../utils/cognitoAuth";

export default function ForgotPassword() {
    const [resetPasswordEmail, setResetPasswordEmail] = useState("");

    function handleResetPassword(e) {
        e.preventDefault();
        forgotPassword(resetPasswordEmail)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    return (
        <>
            <h3>Forgot password</h3>
            <form onSubmit={handleResetPassword}>
                <input
                    required
                    placeholder="email"
                    value={resetPasswordEmail}
                    onChange={(e) => setResetPasswordEmail(e.target.value)}
                />
                <button>Re-send</button>
            </form>
        </>
    );
}
