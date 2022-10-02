import React from 'react';
import { useNavigate } from 'react-router';
import Card from 'react-bootstrap/Card';
import { Grid } from "@material-ui/core/";
import './App.css'

const Container = ({data}) =>{

    let navigate = useNavigate();
    
    return(<>
        <Grid item xs={4} > 
                    <Card onClick={() => navigate(data.route)} className='card_h'>
                        <Card.Img src={data.img} variant='top'/>
                        <Card.Body>
                            <Card.Title className='title_style'>
                                    {data.name}
                            </Card.Title>
                        </Card.Body>
                    </Card>
            </Grid>
            </>
    );
}

export default Container;