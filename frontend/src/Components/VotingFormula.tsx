import React from 'react';
import {useState, useEffect} from 'react';
import { Grid } from "@material-ui/core/";

import NavB from './NavB';
import Formulas from './Formulas';
import './App.css';


const VotingFormula = () =>{
  const [info, setInfo] = useState({});
  
  //console.log(localStorage.getItem("token"));
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

      console.log(info);

  try{
    let data_ = JSON.stringify(info);
    let final = JSON.parse(data_).payload["presidential"];
    console.log(final);

    return(
        <>
            <NavB />
            <div className='margin'>
            <br /><br />
            <Grid style={{marginLeft: '45px'}} className="top" container direction={'row'} spacing={4}>
                <Formulas formulas={final} />
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

export default VotingFormula;