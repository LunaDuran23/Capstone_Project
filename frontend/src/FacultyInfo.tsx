import React from 'react';

import { Grid } from "@material-ui/core/";
import './App.css'
import NavB from './NavB';
import Container from './Container';

import Verde from './images/listas/Verde.jpeg';
import Rojo from './images/listas/Rojo.jpeg';
import Azul from './images/listas/Azul.jpeg';

const lists =[{name: 'CEICT', list:[{img: Verde, name:'Lista Verde', route:'/CEICT/verde'},
                                    {img: Rojo, name:'Lista Roja', route:'/CEICT/roja'},
                                    {img: Azul, name:'Lista Azul', route:'/CEICT/azul'}]},
                {name: 'creacion', list:[{img: Verde, name:'Lista Verde', route:'/creacion/verde'},
                                        {img: Rojo, name:'Lista Roja', route:'/creacion/roja'},
                                        {img: Azul, name:'Lista Azul', route:'/creacion/azul'}]},
                {name: 'gdu', list:[{img: Verde, name:'Lista Verde', route:'/ciencia-politica-gdu/verde'},
                                        {img: Rojo, name:'Lista Roja', route:'/ciencia-politica-gdu/roja'},
                                        {img: Azul, name:'Lista Azul', route:'/ciencia-politica-gdu/azul'}]},
                {name: 'humanas', list:[{img: Verde, name:'Lista Verde', route:'/ciencias-humanas/verde'},
                                        {img: Rojo, name:'Lista Roja', route:'/ciencias-humanas/roja'},
                                        {img: Azul, name:'Lista Azul', route:'/ciencias-humanas/azul'}]},
                {name: 'juris', list:[{img: Verde, name:'Lista Verde', route:'/jurisprudencia/verde'},
                                        {img: Rojo, name:'Lista Roja', route:'/jurisprudencia/roja'},
                                        {img: Azul, name:'Lista Azul', route:'/jurisprudencia/azul'}]},
                {name: 'RRII', list:[{img: Verde, name:'Lista Verde', route:'/RRII/verde'},
                                        {img: Rojo, name:'Lista Roja', route:'/RRII/roja'},
                                        {img: Azul, name:'Lista Azul', route:'/RRII/azul'}]}]



const FacultyInfo = ({faculty}) =>{
    
    let data_;

    for(let i=0; i<6; ++i){
        if(lists[i].name === faculty.name){
            data_ = lists[i].list;
            break;
        }
    }

    console.log(data_);

    return (<>
        <div>
        <NavB/>
        <div className='margin'>
        <Grid className='top' container direction={'row'} spacing={0}>
        {data_.map((item, index) => (
            <Container data={item} />))}
        </Grid>  
        </div>  
        </div>
    </>
    );
}

export default FacultyInfo;