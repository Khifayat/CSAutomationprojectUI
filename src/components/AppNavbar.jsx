import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import GoldLogo from '../assets/GoldLogo.png'
import '../css/AppNavbar.css'

const AppNavbar = ({ isLobbyTv }) => {
    const [expanded, setExpanded] = useState(false);
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"));

    function handleLogout() {
        sessionStorage.removeItem("user");
    }

    return (
        <>
            <Navbar className="mobile-navbar" expanded={expanded} expand="lg" style={{ background: '#005844', height: '80px'}} onToggle={() => setExpanded(expanded ? false : "expanded")}>
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
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: '#ffffff' }} />
                <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapsed">
                    <Nav className="ms-auto"> {}
                        {!isLobbyTv && (
                        <>
                            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
                            <Nav.Link as={Link} to="/register" onClick={() => setExpanded(false)}>Register</Nav.Link>
                            {loggedInUser === null ? (
                            <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>Login</Nav.Link>
                            ) : (
                            <Nav.Link as={Link} to="/login" onClick={() => { handleLogout(); setExpanded(false); }}>Logout</Nav.Link>
                            )}
                            <Nav.Link as={Link} to="/dashboard" onClick={() => setExpanded(false)}>Faculty</Nav.Link>
                        </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default AppNavbar;