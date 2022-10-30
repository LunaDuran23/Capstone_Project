import React from 'react';
import { useEffect, useState } from 'react';

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

const ListInfo = ({voting_list_id, name}) =>{


    const [info, setInfo] = useState({candidates: [], proposals: []});

    useEffect(() => {
        Promise.all([
            fetch('https://nedepuserver.ddns.me:25435/api/info/get_proposals?' + new URLSearchParams({
                voting_list_id: voting_list_id
            })),
            fetch('https://nedepuserver.ddns.me:25435/api/info/get_candidates?' + new URLSearchParams({
                voting_list_id: voting_list_id
            }))
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => setInfo({
            proposals: data1, 
            candidates: data2
        }))
    }, [])

    try{
        
        let c = JSON.stringify(info.candidates);
        let data = JSON.parse(c);

        let p = JSON.stringify(info.proposals);
        let proposals = JSON.parse(p).payload;

        return(<>
            <NavB />
            <div className='margin'>
                <div className='title_list'>
                    <br />
                    <h1>Lista {name}</h1>
                    <br />
                </div>
                <ImageSlider candidates={data.payload} />
                <div className='space_between'></div>
                <div className='title_list'>
                    <h1>Nuestras propuestas</h1>
                    <br />
                </div>
                <Grid className="top" container direction={'row'} spacing={4}>
                {proposals.map((item, index) => (
                    <Proposal data={item} />))}
                </Grid> 
             </div>
        </>
        );
    }catch(e){
        return(
            <h1></h1>
        );
    }


    
}

export default ListInfo;