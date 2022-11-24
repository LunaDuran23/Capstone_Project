import React from 'react';
//import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import { Grid } from "@material-ui/core/";
import './App.css';
//import IMAGE from './/faculty_0.png';

const Container = ({id_, data, facultys}) =>{

    let navigate = useNavigate();
    
    let index = parseInt(id_);
   // console.log(index);

    let response = JSON.stringify(data);
    //console.log(id_);
    
    try{
        let fac_info = JSON.parse(response).payload;
        let info = fac_info[index];
        let data = ["economia", "EICT", "jurisprudencia", "administracion"];
        
        return(<>
            <Grid item xs={4} > 
                <Card onClick={() => navigate('/' + data[index] )} className='card_h'>
                    <Card.Img as={Image} src={'https://nedepuserver.ddns.me:25435/' + info.imgPath} fluid={true} variant='top' />
                    <Card.Body>
                        <Card.Title className='title_style'>
                                {info.name}
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Grid>
            </>
        );
    } catch (e){
        return(
            <h1></h1>
        );
    }
}

export default Container;