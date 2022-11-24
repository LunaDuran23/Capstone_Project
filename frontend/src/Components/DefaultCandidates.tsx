import React from 'react';

import { Carousel } from '3d-react-carousal';
import { Grid } from "@material-ui/core/";

import NavB from './NavB';
import Default from './Default';
import Proposal from './Proposal';
import './App.css'

const DefaultCandidates = () =>{

    const callback = function(index){
        console.log("callback", index);
    }

    const slides: any[] = [];

    for(let i=0; i<5; ++i){
        slides.push(<Default />);
    }

    let proposals = ["Propuesta 1", "Propuesta 2"];

    return(
        <>
        <NavB />
        <div className='margin'>
            <div className='title_list' style={{paddingBottom: '10px', fontFamily: 'Titillium-Web'}}>
                    <br />
                    <h1>Lista Amarilla</h1>
                    <br />
            </div>
            <h1><Carousel slides={slides} autoplay={false} onSlideChange={callback}/></h1>
            <br /><br />
            <div className='title_list'>
                    <h1>Nuestras propuestas</h1>
                    <br />
            </div>
            <Grid className="top" container direction={'row'} spacing={4}>
                {proposals.map((item, index) => (
                    <Proposal data={item} />))}
                </Grid> 
        </div>
        </>
    );
}

export default DefaultCandidates;