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

    const handleClick  = (item) =>{
        setOpen(!open);
        let f = item.name + ' ' + item.surname;
        setData(f);
    }

    const changeState = () =>{
        setOpen(!open);
        setData("");
    }

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
                        <Button color='primary' onClick={() => handleClick(info)}>Votar</Button>
                    </Card.Body>
                </Card>
            </Grid>
        ))}
        <Modal isOpen={open} >
          <ModalHeader>Votaciones Representante Semestre</ModalHeader>
          <ModalBody>
              Desea votar por la formula {data}
          </ModalBody>
          <ModalFooter>
              <Button color='primary' onClick={() => navigate('/')}>Aceptar</Button>
              <Button onClick={changeState}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        </>
        
    );
}

export default SemesterCandidates;