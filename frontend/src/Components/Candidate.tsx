import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

const Candidate = ({data}) => {
    return (
        <MDBCard style={{width: '450px', height:'250px'}}>
            <MDBRow className='g-0'>
                <MDBCol md='4'>
                <MDBCardImage src={data.img} alt='...' fluid />
                </MDBCol>
                <MDBCol md='8'>
                <MDBCardBody>
                    <MDBCardTitle>{data.names} {data.semestre}</MDBCardTitle>
                    <MDBCardText>
                    {data.description}
                    </MDBCardText>
                </MDBCardBody>
                </MDBCol>
            </MDBRow>
        </MDBCard>
    );
}

export default Candidate;
