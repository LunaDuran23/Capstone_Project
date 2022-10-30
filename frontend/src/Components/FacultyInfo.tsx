import React from 'react';
import { useEffect, useState } from 'react';

import { Grid } from "@material-ui/core/";

import './App.css'
import NavB from './NavB';
import Container2 from './Container2';




const FacultyInfo = ({faculty_id, name}) =>{
    
    const [info, setInfo] = useState([]);
    let a = faculty_id;


    useEffect(() => {
        fetch('https://nedepuserver.ddns.me:25435/api/info/get_voting_lists?' + new URLSearchParams({
            faculty_id: a
        }))
        .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
        .then(data => setInfo(data))
      },[])

    console.log(info);

    return (<>
        <div>
        <NavB/>
        <div className='margin'>
            <Container2 lists={info} faculty={name} />
        </div>  
        </div>
    </>
    );
}

export default FacultyInfo;