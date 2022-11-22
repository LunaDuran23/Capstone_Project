import React from 'react';
import { useEffect, useState } from 'react';

import { Grid } from "@material-ui/core/";

import './App.css'
import NavB from './NavB';
import Container from './Container';

const Home = ({facultys}) =>{

    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetch("https://nedepuserver.ddns.me:25435/api/info/faculties/")
        .then(response => response.json())
        .then(data => setInfo(data))
      },[])

    //console.log(info);

    return(
        <div>
        <NavB/>
        <div className='margin'>
            <Grid className='top' container direction={'row'} spacing={0}>
                {Object.entries(facultys).map(([id, ]) => (
                    <Container key={id} id_={id} data={info} facultys={facultys} />
                ))} 
            </Grid>
        </div>  
        </div>
    );
}

export default Home;