import React from 'react';
import { Grid } from "@material-ui/core/";

import NavB from './NavB';
import ImageSlider from './ImageSlider';
import Proposal from './Proposal';
import './App.css';

const proposals = [{name: 'Propuesta 1', description: 'esta es una propuesta'},
                {name: 'Propuesta 2', description: 'esta es una propuesta'},
                {name: 'Propuesta 3', description: 'esta es una propuesta'},
                {name: 'Propuesta 4', description: 'esta es una propuesta'},
                {name: 'Propuesta 5', description: 'esta es una propuesta'},
                {name: 'Propuesta 6', description: 'esta es una propuesta'},
                {name: 'Propuesta 7', description: 'esta es una propuesta'},
                {name: 'Propuesta 8', description: 'esta es una propuesta'},
                {name: 'Propuesta 9', description: 'esta es una propuesta'},
                {name: 'Propuesta 10', description: 'esta es una propuesta'},]

const ListInfo = ({data}) =>{
    console.log(data.name);
    return(<>
        <NavB />
        <div className='margin'>
            <div className='title_list'>
                <h1>Lista</h1>
            </div>
            <ImageSlider />
            <div className='space_between'></div>
            <Grid className="top" container direction={'row'} spacing={4}>
            {proposals.map((item, index) => (
                <Proposal data={item} />))}
            </Grid> 
        </div>
    </>
    );
}

export default ListInfo;