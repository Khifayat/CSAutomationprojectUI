import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import React from "react";
import GoldLogo from '../assets/GoldLogo.png'

const AppNavbar = ({isLobbyTv}) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"))
    function handleLogout(){
        console.log(loggedInUser)
        sessionStorage.removeItem("user")
        console.log(loggedInUser)
    }

    return (
        <>
            <Navbar style={{ background: '#005844', height: '80px' }}>
                <Navbar.Brand>
                    <img
                        src={GoldLogo}
                        width="300"
                        height="40"
                        className="d-inline-block align-top"
                        alt="White Baylor University logo"
                        style={{ paddingTop: '10px', paddingLeft: '5px' }}
                    />
                </Navbar.Brand>
                <div className={"ml-auto ms-sm-auto"} >
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {!isLobbyTv ? (
                                <>
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                    {(loggedInUser === null) ?(
                                        <Nav.Link as={Link} to="/login" >login</Nav.Link>
                                    ):(
                                        <Nav.Link as={Link} to="/login" onClick={handleLogout} >logout</Nav.Link>
                                    ) }
                                    
                                    <Nav.Link as={Link} to="/dashboard">Faculty</Nav.Link>
                                </>
                            ): <></>}
                        </Nav>
                    </Navbar.Collapse>

                </div>

            </Navbar>
        </>
    )
}

export default AppNavbar
