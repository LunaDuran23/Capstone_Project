import React from 'react';
import { useNavigate } from 'react-router';
import { useState, useRef } from 'react';


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import urosario from './urosario.png';

import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
    } from 'reactstrap';

import Webcam from "react-webcam";



const NavB = () => {
    const token_id = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [image,setImage]= useState<string | string>('');
    const webcamRef = useRef<Webcam>(null);
    const [base64, setBase64] = useState('');
    const capture = React.useCallback( () => {
        if(webcamRef.current){
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc as string);
            localStorage.setItem('image', image!.toString());
        }
        
    }, [webcamRef, setImage]);
    console.log(image);

    const handleClickEvent = (event) => {
        localStorage.setItem('token', '');
    };

    const changeState = () =>{
        setOpen(!open);
    }

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
        const videoConstraints = {
            width: 820,
            height: 500,
            facingMode: "user"
        };
        return (
            <>
            <Navbar fixed="top" collapseOnSelect expand="lg" variant="dark" className="color-nav">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={urosario} width="200" height="90" className="d-inline-block align-top" alt="" />
                    </Navbar.Brand>
                    <Form className="form_pos">
                        <Button onClick={changeState} variant="primary">
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
            <Modal isOpen={open} >
                <ModalHeader>Autenticación</ModalHeader>
                <ModalBody>
                    {image == '' ? <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={450}
                    videoConstraints={videoConstraints}
                /> : <h1></h1>}
                </ModalBody>
                <ModalFooter>
                    {image != '' ?
                    <Button onClick={() => 
                    {let a = image?.substring(23) as string;
                    //console.log(a);
                    setBase64(a);
                    console.log(base64);
                    localStorage.setItem('image', image);
                    setOpen(!open);
                    navigate('/votaciones')}}>
                        Ir a votar</Button> :
                    <Button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}>Captura</Button>
                }
                </ModalFooter>
            </Modal>
            </>
            
        );
    }
};
export default NavB;