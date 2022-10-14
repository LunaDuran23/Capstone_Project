import React from 'react';
import { useEffect, useState } from 'react';

import { Grid } from "@material-ui/core/";
import './App.css'
import NavB from './NavB';
import Container from './Container';

import CEICT from './images/CEICT.png';
import Creacion from './images/creacion.png';
import GDU from './images/GDU.png';
import Humanas from './images/humanas.png';
import Juris from './images/juris.png';
import RRII from './images/RRII.png';

const faculty = [{img: CEICT, name: 'Consejo Estudiantil de la Escuela de Ingeniería, Ciencia y Tecnología', route: '/CEICT'},
                {img: Creacion, name: 'Consejo Estudiantil de Creación', route:'/creacion'},
                {img: GDU, name: 'Consejo Estudiantil de Ciencia Política y GDU', route:'/ciencia-politica-gdu'},
                {img: Humanas, name: 'Consejo Estudiantil de Ciencias Humanas', route:'/ciencias-humanas'},
                {img: Juris, name: 'Consejo Estudiantil de Jurisprudencia', route:'/jurisprudencia'},
                {img: RRII, name: 'Consejo Estudiantil de Relaciones Internacionales', route:'/RRII'}]

const Home = () =>{

    const [info, setInfo] = useState([]);

    const consulta = async () =>{
        let dataRequest = {
        method: 'GET'
        }
        let url = new URL("https://nedepuserver.ddns.me:25435/api/info/faculties/");
        let response = await fetch(url, dataRequest);
        let result = await response.json();
        setInfo(result);
    }
    
    useEffect(() => {    
        // Update the document title using the browser API    
        consulta();
    });

    console.log(info);

    return(
        <div>
        <NavB/>
        <div className='margin'>
        <Grid className='top' container direction={'row'} spacing={0}>
        {faculty.map((item, index) => (
            <Container data={item} />))}
        </Grid>  
        </div>  
        </div>
    );
}

export default Home;