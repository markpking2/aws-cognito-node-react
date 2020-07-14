import React from "react";
import AuthHub from "./components/authHub";
import GetUsers from "./components/getUsers";
import "./App.css";

function App() {
    return (
        <div className="App">
            <AuthHub />
            <GetUsers />
        </div>
    );
}

export default App;
