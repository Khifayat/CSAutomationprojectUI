import React, {Suspense} from "react";

import LoginForm from "../components/LoginForm";
import AppNavbar from "../components/AppNavbar";

function LoginPage(){
    return(
        <div>
            <AppNavbar isLobbyTv={false}/>
            < Suspense fallback={<div>Loading...</div>}>
            <LoginForm/>
            </Suspense>
        </div>
    )
}

export default LoginPage