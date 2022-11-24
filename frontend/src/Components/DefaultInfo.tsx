import React from 'react';

import { useNavigate } from 'react-router';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import { Grid } from "@material-ui/core/";

import NavB from './NavB';
import './App.css';

import IMG from './color.jpg';


const DefaultInfo = ({name}) =>{

    let navigate = useNavigate();

    return(
        <>
        <NavB />
        <div className='margin_default'>
            <Grid item xs={4} > 
            <Card onClick={() => navigate('/' + name + '/lista')} className='card_h'>
                    <Card.Img as={Image} src={IMG} fluid={true} variant='top' />
                    <Card.Body>
                        <Card.Title className='title_style'>
                                Lista Amarilla
                        </Card.Title>
                    </Card.Body>
            </Card>
            </Grid>
        </div>
        </>
    );
}

export default DefaultInfo;