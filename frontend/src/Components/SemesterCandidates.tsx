import React from 'react';
import { Grid } from "@material-ui/core/";
import { useNavigate } from 'react-router';
import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'

import {
    Modal,
    ModalBody,
    ModalHeader,
    Button,
    ModalFooter
    } from 'reactstrap';

import './App.css';

const SemesterCandidates = ({candidates}) =>{

    let navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [data, setData] = useState("");
    const [choice, setChoice] = useState(-1);
    const [res, setRes] = useState({});

    const handleClick  = (item, index) =>{
        setOpen(!open);
        let f = item.name + ' ' + item.surname;
        setData(f);
        setChoice(index);
    }

    const changeState = () =>{
        setOpen(!open);
        setData("");
    }

    const whiteVote = () =>{
        setOpen(!open);
        setData("Voto en Blanco");
    }
    console.log(localStorage.getItem("token"));
    const Voting = ()=>{
        let formula = localStorage.getItem("formula");
        let vote = {press_choice: 0, semester_choice: 0};
        console.log(typeof formula);
        console.log(vote);
        const requestOptions = {
            method: 'POST',
            headers:  ({
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            })
        };
        fetch('https://nedepuserver.ddns.me:25435/api/voting/cast-vote?pres_choice='+formula+'&semester_choice='+choice, requestOptions)
            .then(response => response.json())
            .then(data => setRes(data));
        //navigate('/');
    }

    console.log(res);

    return(
        <>
        {candidates.map((info, index) => (
            <Grid item xs={4} > 
                <Card className='card_h' style={{ height: '450px' }}>
                    <Card.Img as={Image} src={'https://nedepuserver.ddns.me:25435/' + info.imgPath} fluid={true} variant='top' />
                    <Card.Body>
                        <Card.Title className='title_style'>
                                {info.name + ' ' + info.surname}
                        </Card.Title>
                        <Button color='primary' onClick={() => handleClick(info, index)}>Votar</Button>
                    </Card.Body>
                </Card>
            </Grid>
        ))}
        <Grid item xs={4} > 
                <Card className='card_h' style={{ height: '450px' }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', paddingBottom: '100px', paddingTop: '70px', fontSize: '40px'}}>
                                Voto en Blanco
                        </Card.Title>
                        <Button color='primary' onClick={whiteVote}>Votar</Button>
                    </Card.Body>
                </Card>
            </Grid>
        <Modal isOpen={open} >
          <ModalHeader>Votaciones Representante Semestre</ModalHeader>
          <ModalBody>
              Desea votar por la formula {data}
          </ModalBody>
          <ModalFooter>
              <Button color='primary' onClick={Voting}>Aceptar</Button>
              <Button onClick={changeState}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        </>
        
    );
}

export default SemesterCandidates;