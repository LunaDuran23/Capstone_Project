import React from 'react';
import { useNavigate } from 'react-router';
import Card from 'react-bootstrap/Card';
import { Grid } from "@material-ui/core/";
import './App.css'

import NavB from './NavB';

import CEICT from './images/CEICT.png';
import CECN from './images/CECN.png';
import Creacion from './images/creacion.png';
import Econ from './images/economia.png';
import GDU from './images/GDU.png';
import Humanas from './images/humanas.png';
import Juris from './images/juris.png';
import Medicina from './images/medicina.png';
import Psicologia from './images/psicologia.png';
import Rehab from './images/rehab.png';
import RRII from './images/RRII.png';

const faculty = [{img: CEICT, name: 'Consejo Estudiantil de la Escuela de Ingeniería, Ciencia y Tecnología', route: '/CEICT'},
                {img: CECN, name: 'Consejo Estudiantil de Ciencias Naturales', route:'/CECN'},
                {img: Creacion, name: 'Consejo Estudiantil de Creación', route:'/creacion'},
                {img: Econ, name: 'Consejo Estudiantil de Economía', route:'/economia'},
                {img: GDU, name: 'Consejo Estudiantil de Ciencia Política y GDU', route:'/ciencia-politica-gdu'},
                {img: Humanas, name: 'Consejo Estudiantil de Ciencias Humanas', route:'/ciencias-humanas'},
                {img: Juris, name: 'Consejo Estudiantil de Jurisprudencia', route:'/jurisprudencia'},
                {img: Medicina, name: 'Consejo Estudiantil de Medicina', route:'/medicina'},
                {img: Psicologia, name: 'Consejo Estudiantil de Psicología', route:'/psicologia'},
                {img: Rehab, name: 'Consejo Estudiantil de Rehabilitación', route:'/rehabilitacion'},
                {img: RRII, name: 'Consejo Estudiantil de Relaciones Internacionales', route:'/RRII'}]

const Home = () =>{

    let navigate = useNavigate();

    return(
        <>
        <NavB/>
        <div className='margin'>
        <Grid container direction={'row'} spacing={0}>
        {faculty.map((item, index) => (
            <Grid item xs={4} > 
                    <Card onClick={() => navigate(item.route)} className='card_h'>
                        <Card.Img src={item.img} variant='top'/>
                        <Card.Body>
                            <Card.Title className='title_style'>
                                    {item.name}
                            </Card.Title>
                        </Card.Body>
                    </Card>
            </Grid>))}
        </Grid>  
        </div>  
        </>
    );
}

export default Home;