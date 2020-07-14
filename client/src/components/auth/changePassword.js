import React, { useState } from "react";
import { changePassword } from "../../utils/cognitoAuth";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    function handleChangePassword(e) {
        e.preventDefault();
        changePassword(oldPassword, newPassword)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <h3>Change password</h3>
            <form onSubmit={handleChangePassword}>
                <input
                    required
                    placeholder="old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    required
                    placeholder="new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button>Submit</button>
            </form>
        </>
    );
}
