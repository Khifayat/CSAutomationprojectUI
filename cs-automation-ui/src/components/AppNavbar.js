import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import GoldLogo from '../assets/GoldLogo.png'
const AppNavbar = () =>{
    return(
        <>
            <Navbar style={{background:"#005844", height:"60px"}}>
                <Navbar.Brand >
                    <img
                        src={GoldLogo}
                        width="300"
                        height="40"
                        className="d-inline-block align-top "
                        alt="White Baylor University logo"
                        style={{paddingTop:"10px", paddingLeft:"5px"}}/>
                </Navbar.Brand>
            </Navbar>
        </>
    )
}

export default AppNavbar
