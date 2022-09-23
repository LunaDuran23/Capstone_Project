import React from 'react';
import { Grid } from "@material-ui/core/";

import NavB from './NavB';
import Container from './Container';
import './App.css'

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

    return(
        <>
        <NavB/>
        <div className='margin'>
        <Grid container direction={'row'} spacing={0}>
        {faculty.map((item, index) => (
            <Container data={item} />))}
        </Grid>  
        </div>  
        </>
    );
}

export default Home;