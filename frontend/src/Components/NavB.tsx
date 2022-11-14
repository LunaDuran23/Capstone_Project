import React from 'react';
import { useNavigate } from 'react-router';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import urosario from './urosario.png';

const NavB = () => {
    const token_id = localStorage.getItem('token');

    const handleClickEvent = (event) => {
        localStorage.setItem('token', '');
    };

    console.log('Este es el token_id : ', token_id);
    let navigate = useNavigate();
    if (token_id === '' || token_id === null) {
        return (
            <Navbar fixed="top" collapseOnSelect expand="lg" variant="dark" className="color-nav">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={urosario} width="200" height="90" className="d-inline-block align-top" alt="" />
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/resultados">Consultar Resultados</Nav.Link>
                        <Nav.Link href="/logIn">Log In</Nav.Link>
                        <Nav.Link href="/signUp">Sign Up</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    } else {
        return (
            <Navbar fixed="top" collapseOnSelect expand="lg" variant="dark" className="color-nav">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={urosario} width="200" height="90" className="d-inline-block align-top" alt="" />
                    </Navbar.Brand>
                    <Form className="form_pos">
                        <Button onClick={() => navigate('/votaciones')} variant="primary">
                            Votaciones
                        </Button>{' '}
                    </Form>
                    <Nav>
                        <Nav.Link href="/resultados">Consultar Resultados</Nav.Link>
                        <Nav.Link href="/" onClick={handleClickEvent}>
                            Log Out
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
};
export default NavB;
