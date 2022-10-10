import React from 'react';

import { Carousel } from '3d-react-carousal';

import Candidate from './Candidate';
import Verde from './images/listas/Verde.jpeg';


const candidates = [
    {img: Verde, semestre: 'Formula presi/vice', names: 'P1 y P2', description: 'Hola somos ...'},
    {img: Verde, semestre: 'Primer Semestre', names: 'S1', description: 'Hola soy ...'},
    {img: Verde, semestre: 'Segundo Semestre', names: 'S2', description: 'Hola soy ...'},
    {img: Verde, semestre: 'Tercer Semestre', names: 'S3', description: 'Hola soy ...'},
    {img: Verde, semestre: 'Cuarto Semestre', names: 'S4', description: 'Hola soy ...'},
    {img: Verde, semestre: 'Quinto Semestre', names: 'S5', description: 'Hola soy ...'},
    {img: Verde, semestre: 'Sexto Semestre', names: 'S6', description: 'Hola soy ...'},
    {img: Verde, semestre: 'Septimo Semestre', names: 'S7', description: 'Hola soy ...'},
    {img: Verde, semestre: 'Octavo Semestre', names: 'S8', description: 'Hola soy ...'}
];

const ImageSlider = () => {

    const callback = function(index){
    console.log("callback",index);
}

    const slides: any[] = [];

    for(let i=0; i<9; ++i){
        slides.push(<Candidate data={candidates[i]} />);
    }

    console.log(slides);

    return(
        <>
            <Carousel slides={slides} autoplay={false} onSlideChange={callback}/>
    
        </>
    )
}

export default ImageSlider;