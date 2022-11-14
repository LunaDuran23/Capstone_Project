import React from 'react';
import {useState, useEffect} from 'react';

import { Grid } from "@material-ui/core/";

import NavB from './NavB';
import SemesterCandidates from './SemesterCandidates';
import './App.css';


const VotingSemester = () =>{

    const [info, setInfo] = useState({});

    useEffect(() => {
        fetch("https://nedepuserver.ddns.me:25435/api/voting/get-voting-otpions",{
          headers: new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          })
        })
        .then(response => response.json())
        .then(data => setInfo(data))
      },[])

    try{
      
      let data_ = JSON.stringify(info);
      let final = JSON.parse(data_).payload["semester"];


    return(
        <>
        <NavB />
        <div className='margin'>
        <Grid className="top" container direction={'row'} spacing={6}>
            <SemesterCandidates candidates={final} />
        </Grid> 
        </div>
        </>
    );

    }catch{
      return(
        <NavB/>
      );
    }

    
}

export default VotingSemester;