import React from 'react';
import { Grid } from "@material-ui/core/";

import NavB from './NavB';
import Container from './Container';
import './App.css';

import Verde from './images/listas/Verde.jpeg';
import Rojo from './images/listas/Rojo.jpeg';
import Azul from './images/listas/Azul.jpeg'

const consejos = [{name: 'EICT', listas:[{img: Verde, name: 'Lista Verde', route: '/CEICT/verde'},
                                        {img: Rojo, name:'Lista Roja', route: '/CEICT/roja'},
                                        {img: Azul, name:'Lista Azul', route: '/CEICT/azul'}]}, 
                {name: 'creacion', listas:[{img: Verde, name: 'Lista Verde', route: '/creacion/verde'},
                                        {img: Rojo, name:'Lista Roja', route: '/creacion/roja'},
                                        {img: Azul, name:'Lista Azul', route: '/creacion/azul'}]},
                {name: 'gdu', listas:[{img: Verde, name: 'Lista Verde', route: '/ciencia-politica-gdu/verde'},
                                        {img: Rojo, name:'Lista Roja', route: '/ciencia-politica-gdu/roja'},
                                        {img: Azul, name:'Lista Azul', route: '/ciencia-politica-gdu/azul'}]},
                {name: 'humanas', listas:[{img: Verde, name: 'Lista Verde', route: '/ciencias-humanas/verde'},
                                        {img: Rojo, name:'Lista Roja', route: '/ciencias-humanas/roja'},
                                        {img: Azul, name:'Lista Azul', route: '/ciencias-humanas/azul'}]},
                {name: 'juris', listas:[{img: Verde, name: 'Lista Verde', route: '/jurisprudencia/verde'},
                                        {img: Rojo, name:'Lista Roja', route: '/jurisprudencia/roja'},
                                        {img: Azul, name:'Lista Azul', route: '/jurisprudencia/azul'}]},
                {name: 'RRII', listas:[{img: Verde, name: 'Lista Verde', route: '/RRII/verde'},
                                        {img: Rojo, name:'Lista Roja', route: '/RRII/roja'},
                                        {img: Azul, name:'Lista Azul', route: '/RRII/azul'}]}]


const DynamicComponent = ({faculty}) =>{

    let info_;
    for (let i=0; i < 6; ++i){
        if (faculty.name === consejos[i].name){
            info_ = consejos[i].listas;
            break;
        }
    }

    return (<>
        <NavB />
        <div className='margin'>
        <Grid container direction={'row'} spacing={0}>
        {info_.map((item, index) => (
            <Container data={item} />))}
        </Grid>  
        </div>  
    </>
    );
}

export default DynamicComponent;