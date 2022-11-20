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
import { useEffect, useState } from 'react';

import './Fonts.css'

// <MDBCardHeader></MDBCardHeader>

const Candidate = ({data}) => {

    let status;

    if(data.status === "President"){
        return (
            <MDBCard style={{width: '450px', height:'193px'}}>
                <MDBCardHeader className='header' style={{backgroundColor: '#E7E6F7'}}>Presidente</MDBCardHeader>
                <MDBRow className='g-0'>
                    <MDBCol md='4'>
                    <MDBCardImage src={'https://nedepuserver.ddns.me:25435/' + data.imgPath} alt='...' fluid />
                    </MDBCol>
                    <MDBCol md='8'>
                    <MDBCardBody>
                        <MDBCardTitle className='name'>{data.name} {data.surname}</MDBCardTitle>
                        <MDBCardText className='description'>
                            {data.description}
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        );
    }if(data.status === 'Vicepresident'){
        status = "Vicepresidente"
    }else{
        let str_ = ['Primer Semestre', 'Segundo Semestre', 'Tercer Semestre', 'Cuarto Semestre',
                    'Quinto Semestre', 'Sexto Semestre', 'Septimo Semestre', 'Octavo Semestre'];
        status = str_[data.semester-1];
    }

    console.log(data.imgPath)

    return (
        <MDBCard style={{width: '450px', height:'193px'}}>
            <MDBCardHeader className='header' style={{backgroundColor: '#E7E6F7'}}>{status}</MDBCardHeader>
            <MDBRow className='g-0'>
                <MDBCol md='4'>
                <MDBCardImage src={'https://nedepuserver.ddns.me:25435/' + data.imgPath} alt='...' fluid />
                </MDBCol>
                <MDBCol md='8'>
                <MDBCardBody>
                    <MDBCardTitle className='name'>{data.name} {data.surname}</MDBCardTitle>
                    <MDBCardText className='description'>
                        {data.description}
                    </MDBCardText>
                </MDBCardBody>
                </MDBCol>
            </MDBRow>
        </MDBCard>
    );
}

export default Candidate;
