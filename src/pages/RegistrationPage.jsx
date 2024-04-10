import React from "react";
 
import RegistrationForm from "../components/RegistrationForm";
import AppNavbar from "../components/AppNavbar";


const RegistrationPage = ()  => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"))
    return(
        <div>
            <AppNavbar isLobbyTv={false}/>
            {(loggedInUser != null) ? (
                <h1>You have already registered and logged in</h1>
            ) : (
                <div>
                    <RegistrationForm/>
                </div>
            )}
            
        </div>
    )
}

export default RegistrationPage