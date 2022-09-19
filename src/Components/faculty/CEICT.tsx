import React from 'react';
import { Grid } from "@material-ui/core/";

import NavB from '../NavB';
import Container from '../Container';
import Oliva from './CEICT/images/oliva.png';


const lists = [{img: Oliva, name: 'Lista Oliva', route: '/CEICT/oliva'}];

function CEICT(){
    return(<>
        <NavB/>
        <div className='margin'>
        <NavB/>
        <div className='margin'>
        <Grid container direction={'row'} spacing={0}>
        {lists.map((item, index) => (
            <Container data={item} />))}
        </Grid>  
        </div>  
        </div>
        </>
    );
}

export default CEICT;