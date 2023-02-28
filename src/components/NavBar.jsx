import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const user = useSelector(state => state.userLoged);
    const navigate = useNavigate();
    const exitApp = () => {
        localStorage.removeItem("userLiquidation");
        localStorage.removeItem("tokenLiquidation");
        navigate("/login");
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">BossDesign</Navbar.Brand>
                <div aria-controls="responsive-navbar-nav" className='d-flex flex-row'>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav">
                        <div className='m-1'>
                            {user?.username}
                            <i className="fa-solid fa-user bx-fw"></i>
                            
                        </div>
                    </Navbar.Toggle>
                </div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="light">Search</Button>
                        </Form>
                        <Button onClick={() => exitApp()}>
                            <i className="fa-solid fa-right-from-bracket bx-fw"></i>
                            Logout
                        </Button>
                        <Button className='d-flex' onClick={() => console.log("Setting")}>
                            <i className="fa-solid fa-gear bx-fw"></i>
                        </Button>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar >
    );
};

export default NavBar;