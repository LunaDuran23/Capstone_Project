import React from 'react';

import { Carousel } from '3d-react-carousal';

import Candidate from './Candidate';


const ImageSlider = ({candidates}) => {

    

    const callback = function(index){
        console.log("callback", index);
    }

    const slides: any[] = [];

    try{
        let a = candidates.length > 0
        for(let i=0; i<candidates.length; ++i){
            slides.push(<Candidate data={candidates[i]} />);
        }
        return(
            <>
                <h1><Carousel slides={slides} autoplay={false} onSlideChange={callback}/></h1>
            </>
        );    
    }catch(e){
        return(
            <h1></h1>
        );
    }
    

    
}

export default ImageSlider;