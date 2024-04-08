import React from "react";

import RegistrationForm from "../components/RegistrationForm";
import AppNavbar from "../components/AppNavbar";
// import RegisterState from "./RegisterState"


const RegistrationPage = ()  => {
    return(
        <div>
            <AppNavbar isLobbyTv={false}/>
            <RegistrationForm/>
        </div>
    )
}

export default RegistrationPage