import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import urosario from "./urosario.png";


function NavB(){
    return(
            <Navbar fixed="top" collapseOnSelect expand="lg" variant="dark" className="color-nav">
                <Container>
                <Navbar.Brand href="/">
                  <img
                    src={urosario}
                    width="200"
                    height="90"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                   />
                </Navbar.Brand>
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