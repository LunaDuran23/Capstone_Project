import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Card from 'react-bootstrap/Card';
import { Grid } from "@material-ui/core/";
import './App.css';
import IMAGE from './images/faculty_0.png';

const Container2 = ({lists, faculty}) =>{

    let navigate = useNavigate();

    let response = JSON.stringify(lists);
    
    try{
        let lists_info = JSON.parse(response).payload;
        console.log(lists_info);
        return(<>
            <Grid className='top' container direction={'row'} spacing={0}>
            {lists_info.map((item, index) => (
               <Grid item xs={4} > 
               <Card onClick={() => navigate('/' + faculty + '/' + item.name.replace(/ /g, ''))} className='card_h'>
                   <Card.Img src={'https://nedepuserver.ddns.me:25435/' + item.imgPath} variant='top'/>
                   <Card.Body>
                       <Card.Title className='title_style'>
                               {item.name}
                       </Card.Title>
                   </Card.Body>
               </Card>
           </Grid> ))}
        </Grid>
            </>
        );
    } catch (e){
        return(
            <h1></h1>
        );
    }
}

export default Container2;