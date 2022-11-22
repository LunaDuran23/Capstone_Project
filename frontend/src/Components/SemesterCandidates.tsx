import React from 'react';
import { Grid } from "@material-ui/core/";
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Buffer } from 'buffer';

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
    let a = localStorage.getItem("image");
    
    //console.log(hp);
    const convertBase64ToBlob = (base64Image) =>{
        // Split into two parts
        const parts = base64Image.split(';base64,');

        // Hold the content type
        const imageType = parts[0].split(':')[1];

        // Decode Base64 string
        const decodedData = window.atob(parts[1]);

        // Create UNIT8ARRAY of size same as row data length
        const uInt8Array = new Uint8Array(decodedData.length);

        // Insert all character code into uInt8Array
        for (let i = 0; i < decodedData.length; ++i) {
            uInt8Array[i] = decodedData.charCodeAt(i);
        }

        // Return BLOB image after conversion
        return new Blob([uInt8Array], { type: imageType });
    }

    let blob = convertBase64ToBlob(a);
    //console.log(blob);

    let file = new File([blob], 'a.jpeg');
    //console.log(f);

    const Voting = ()=>{
        let formula = localStorage.getItem("formula");
        let image = localStorage.getItem("image");
        let data = `data:image/jpeg;base64,${image}`;
        //console.log(image);
        let vote = {press_choice: formula, semester_choice: choice};
        const requestOptions = {
            method: 'POST',
            headers:  ({
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            })
        };
        fetch('https://nedepuserver.ddns.me:25435/api/voting/cast-vote?img_verification='+file+'&pres_choice='+formula+'&semester_choice='+choice, requestOptions)
            .then(response => response.json())
            .then(data => setRes(data));
            //console.log(data);
            console.log("HPPP");
            console.log(res);
        //navigate('/');
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