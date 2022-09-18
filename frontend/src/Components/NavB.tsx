import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

function NavB(){
    return(
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">UR Elige</Navbar.Brand>
                    <Form className="form_pos">
                        <Button variant="secondary">Consultar Estadisticas</Button>{' '}
                    </Form>
                    <Nav>
                        <Nav.Link href="/logIn">Log In</Nav.Link>
                        <Nav.Link href="/signUp">Sign Up</Nav.Link>
                    </Nav>
            </Container>
        </Navbar>
    );
}

export default NavB;