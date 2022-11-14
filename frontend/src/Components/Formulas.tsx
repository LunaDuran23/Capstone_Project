import React from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Grid } from "@material-ui/core/";

import {
    MDBCard,
    MDBCardTitle,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn
  } from 'mdb-react-ui-kit';

import {
    Modal,
    ModalBody,
    ModalHeader,
    Button,
    ModalFooter
    } from 'reactstrap';

const Formulas = ({formulas}) =>{

    let navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [data, setData] = useState("");
    const [choice, setChoice] = useState(-1);

    const handleClick  = (item, index) =>{
        setOpen(!open);
        let f = item["president"].name + ' ' + item["president"].surname + ' y ' + item["vicepresident"].name + ' ' + item["vicepresident"].surname;
        setData(f);
        setChoice(index);
    }

    const changeState = () =>{
        setOpen(!open);
        setData("");
    }
    
    const Redirect = () =>{
        localStorage.setItem("formula", JSON.stringify(choice));
        console.log(JSON.stringify(choice));
        navigate('/votaciones/semestre');
    }

    const whiteVote = () =>{
        setOpen(!open);
        setData("Voto en Blanco");
    }

    return(
        <>
        {formulas.map((item, index) => (
            <Grid key={index} item xs={5} > 
              <MDBCard style={{width: '450px', height:'350px'}} className='card_h'>
              <MDBRow className='g-0'>
                  <MDBCol style={{paddingRight: '5px'}} md='6'>
                      <MDBCardImage  src={'https://nedepuserver.ddns.me:25435/'+ item["president"].imgPath} alt='...' fluid />
                  </MDBCol>
                  <MDBCol style={{paddingLeft: '5px'}} md='6'>
                  <MDBCardImage src={'https://nedepuserver.ddns.me:25435/'+ item["vicepresident"].imgPath} alt='...' fluid />
                  </MDBCol>
              </MDBRow>
              <MDBCardBody >
                  <MDBCardTitle style={{ textAlign: 'center'}}>{item["president"].name + ' ' + item["president"].surname + ' y ' + item["vicepresident"].name + ' ' + item["vicepresident"].surname}</MDBCardTitle>
                  <MDBBtn onClick={() => handleClick(item, index)} >Votar</MDBBtn>
              </MDBCardBody>
          </MDBCard>
          </Grid> 
          ))}

        <Grid item xs={5} > 
              <MDBCard style={{width: '450px', height:'350px'}} className='card_h'>
              <MDBCardBody >
                  <MDBCardTitle style={{ textAlign: 'center', paddingBottom: '100px', paddingTop: '70px', fontSize: '40px'}}>Voto en Blanco</MDBCardTitle>
                  <MDBBtn onClick={whiteVote}>Votar</MDBBtn>
              </MDBCardBody>
          </MDBCard>
          </Grid> 
          
        <Modal isOpen={open} >
          <ModalHeader>Votaciones Formula Presidencial</ModalHeader>
          <ModalBody>
              Desea votar por la formula {data}
          </ModalBody>
          <ModalFooter>
              <Button color='primary' onClick={Redirect}>Aceptar</Button>
              <Button onClick={changeState}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
}

export default Formulas;