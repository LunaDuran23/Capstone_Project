import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCardHeader,
  MDBCol
} from 'mdb-react-ui-kit';

import IMG from './person.png';

const Default = () =>{
    return(
        <MDBCard style={{width: '450px', height:'213px'}}>
            <MDBCardHeader className='header' style={{backgroundColor: '#E7E6F7'}}>Formula o Semestre</MDBCardHeader>
            <MDBRow className='g-0'>
                <MDBCol md='4'>
                <MDBCardImage src={IMG} alt='...' fluid />
                </MDBCol>
                <MDBCol md='8'>
                <MDBCardBody>
                    <MDBCardTitle className='name'>Candidato</MDBCardTitle>
                    <MDBCardText className='description'>
                        Descripción candidato
                    </MDBCardText>
                </MDBCardBody>
                </MDBCol>
            </MDBRow>
        </MDBCard>
    );
}

export default Default;