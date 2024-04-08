import React from "react";

import LoginForm from "../components/LoginForm";
import AppNavbar from "../components/AppNavbar";

function LoginPage(){
    return(
        <div>
            <AppNavbar isLobbyTv={false}/>
            <LoginForm/>
        </div>
    )
}

export default LoginPage