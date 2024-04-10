import React, { Suspense } from "react";

import LoginForm from "../components/LoginForm";
import AppNavbar from "../components/AppNavbar";

function LoginPage() {
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"))
    return (
        <div>
            <AppNavbar isLobbyTv={false} />
            < Suspense fallback={<div>Loading...</div>}>
                {(loggedInUser != null) ? (
                    <h1 className="loginError">You are already logged in</h1>
                ) : (
                    <div>
                        <LoginForm />
                    </div>
                )}
            </Suspense>

        </div>
    )
}

export default LoginPage