import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function GetUsers() {
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);

    function getUsers() {
        setError(null);
        axiosWithAuth("get", "/users")
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err);
                if (users) {
                    setUsers(null);
                }
                setError(err);
            });
    }
    return (
        <>
            <h1>Get Users:</h1>
            <button onClick={() => getUsers()}>
                Click to get users from server
            </button>
            {error && <h3>Error: {error.message}</h3>}
            {users && <p>{JSON.stringify(users)}</p>}
        </>
    );
}
