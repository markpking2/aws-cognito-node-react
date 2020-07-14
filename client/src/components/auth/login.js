import React, { useState } from "react";
import { signIn } from "../../utils/cognitoAuth";

export default function LogIn() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    function handleLogin(e) {
        e.preventDefault();
        signIn(loginEmail, loginPassword).catch(() => {});
    }
    return (
        <>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <input
                    placeholder="email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                    value={loginEmail}
                />
                <input
                    type="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                    value={loginPassword}
                    placeholder="password"
                />
                <button>Log in</button>
            </form>
        </>
    );
}
