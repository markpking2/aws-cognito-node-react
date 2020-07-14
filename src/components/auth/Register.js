import React, { useState } from "react";
import { signUp } from "../../utils/cognitoAuth";

export default function Register() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    function handleRegister(e) {
        e.preventDefault();
        signUp(registerEmail, registerPassword).catch((err) =>
            console.log(err)
        );
    }
    return (
        <>
            <h3>Register</h3>
            <form onSubmit={handleRegister}>
                <input
                    placeholder="email"
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    value={registerEmail}
                />
                <input
                    type="password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    value={registerPassword}
                    placeholder="password"
                />
                <button>Register</button>
            </form>
        </>
    );
}
