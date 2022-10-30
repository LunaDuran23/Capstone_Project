import React from 'react';
import { useNavigate } from 'react-router';
import { Grid } from "@material-ui/core/";

import NavB from './NavB';
import IMAGE from './faculty_0.png';
import IMAGE2 from './faculty_1.png';

import {
    MDBCard,
    MDBCardTitle,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn
  } from 'mdb-react-ui-kit';

const data = {
    "presidential": [
      {
        "president": {
          "name": "Andrea",
          "surname": "Soto",
          "voting_list_id": 2,
          "description": "Hola soy Andrea Soto y yo soy tú candidato!",
          "semester": -1,
          "status": "President",
          "imgPath": "static/imgs/Andrea_Soto69228817.jpeg"
        },
        "vicepresident": {
          "name": "Daniel",
          "surname": "Alejandro Tercero",
          "voting_list_id": 2,
          "description": "Hola soy Daniel Alejandro Tercero y yo soy tú candidato!",
          "semester": -1,
          "status": "Vicepresident",
          "imgPath": "static/imgs/Daniel_AlejandroTercero38671527.jpeg"
        }
      },
      {
        "president": {
          "name": "Joshua",
          "surname": "Salinas Segundo",
          "voting_list_id": 0,
          "description": "Hola soy Joshua Salinas Segundo y yo soy tú candidato!",
          "semester": -1,
          "status": "President",
          "imgPath": "static/imgs/Joshua_SalinasSegundo37977828.jpeg"
        },
        "vicepresident": {
          "name": "Julián",
          "surname": "Alaniz Tercero",
          "voting_list_id": 0,
          "description": "Hola soy Julián Alaniz Tercero y yo soy tú candidato!",
          "semester": -1,
          "status": "Vicepresident",
          "imgPath": "static/imgs/Julian_AlanizTercero96481289.jpeg"
        }
      },
      {
        "president": {
          "name": "Facundo",
          "surname": "Melgar",
          "voting_list_id": 1,
          "description": "Hola soy Facundo Melgar y yo soy tú candidato!",
          "semester": -1,
          "status": "President",
          "imgPath": "static/imgs/Facundo_Melgar23116719.jpeg"
        },
        "vicepresident": {
          "name": "Ricardo",
          "surname": "Varela",
          "voting_list_id": 1,
          "description": "Hola soy Ricardo Varela y yo soy tú candidato!",
          "semester": -1,
          "status": "Vicepresident",
          "imgPath": "static/imgs/Ricardo_Varela56972699.jpeg"
        }
      }
    ],
    "semester": [
      {
        "name": "Juan",
        "surname": "Arevalo Segundo",
        "voting_list_id": 2,
        "description": "Hola soy Juan Arevalo Segundo y yo soy tú candidato!",
        "semester": 8,
        "status": "Semester",
        "imgPath": "static/imgs/Juan_ArevaloSegundo99623953.jpeg"
      },
      {
        "name": "Carla",
        "surname": "Díaz",
        "voting_list_id": 0,
        "description": "Hola soy Carla Díaz y yo soy tú candidato!",
        "semester": 8,
        "status": "Semester",
        "imgPath": "static/imgs/Carla_Diaz69223928.jpeg"
      },
      {
        "name": "Nicole",
        "surname": "Santillán Segundo",
        "voting_list_id": 1,
        "description": "Hola soy Nicole Santillán Segundo y yo soy tú candidato!",
        "semester": 8,
        "status": "Semester",
        "imgPath": "static/imgs/Nicole_SantillanSegundo25381927.jpeg"
      }
    ]
  };

const VotingFormula = () =>{

    let formulas = data["presidential"];
    
    let navigate = useNavigate();

    return(
        <>
            <NavB />
            <div className='margin'>
            <br /><br /><br />
            <Grid className="top" container direction={'row'} spacing={6}>
                {formulas.map((item, index) => (
                  <Grid item xs={5} > 
                    <MDBCard style={{width: '450px', height:'320px'}}>
                    <MDBRow className='g-0'>
                        <MDBCol md='6'>
                            <MDBCardImage src={'https://nedepuserver.ddns.me:25435/'+ item["president"].imgPath} alt='...' fluid />
                        </MDBCol>
                        <MDBCol md='6'>
                        <MDBCardImage src={'https://nedepuserver.ddns.me:25435/'+ item["vicepresident"].imgPath} alt='...' fluid />
                        </MDBCol>
                    </MDBRow>
                    <MDBCardBody >
                        <MDBCardTitle style={{ textAlign: 'center'}}>{item["president"].name + ' ' + item["president"].surname + ' y ' + item["vicepresident"].name + ' ' + item["vicepresident"].surname}</MDBCardTitle>
                        <MDBBtn onClick={() => navigate('/votaciones/semestre')} style={{marginLeft: '165px'}}>Votar</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
                </Grid> ))}
                </Grid> 
            </div>
        </>
    );
}

export default VotingFormula;