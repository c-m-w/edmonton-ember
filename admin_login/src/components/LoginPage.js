/// LoginPage.js

import {useState} from "react";

import attemptLogin from "../utils/attemptLogin";
import setCredentialCookie from "../utils/setCredentialCookie";

export default function LoginPage() {

    const [state, setState] = useState({username: "", password: ""});

    const setCredentials = (e) => {

        console.log(e.target.name);
        setState(oldState => ({...oldState, [e.target.name]: e.target.value}));
    };

    const submitCredentials = async (e) => {

        e.preventDefault();
        if (await attemptLogin(state)) {

            setCredentialCookie(state);
            window.location.reload();
        }
    };

    const disabled = !(state.username && state.password);

    return (
        <>
            <header>
                <h1>Admin panel</h1>
                <h2>Request access</h2>
            </header>
            <div className="form-wrapper">
                <form onSubmit={submitCredentials}>
                    <label
                        id="username-label"
                        htmlFor="username-input">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username-input"
                        value={state["username"]}
                        onChange={setCredentials} />
                    <label
                        id="password-label"
                        htmlFor="password-input">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password-input"
                        value={state["password"]}
                        onChange={setCredentials} />
                    <button id="login" disabled={disabled}>Login</button>
                </form>
            </div>
        </>
    )
}