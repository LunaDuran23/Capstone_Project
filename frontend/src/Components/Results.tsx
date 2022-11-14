import React from 'react';
import { useState } from "react";

import NavB from './NavB';
import ChartVotes from './ChartVotes';
import FacultyResult from './FacultyResults';

import './App.css'


const data = { "economia": {"formula": [
        {name: "1", votes: 10},
        {name: "2", votes: 5},
        {name: "3", votes: 8}
    ],
    "Primer Semestre": [
        {name: "1", votes: 20},
        {name: "2", votes: 5},
        {name: "3", votes: 8}
    ],
    "Segundo Semestre": [
        {name: "1", votes: 10},
        {name: "2", votes: 15},
        {name: "3", votes: 8}
    ],
    "Tercer Semestre": [
        {name: "1", votes: 10},
        {name: "2", votes:1},
        {name: "3", votes: 8}
    ],
    "Cuarto Semestre": [
        {name: "1", votes: 10},
        {name: "2", votes: 5},
        {name: "3", votes: 28}
    ]}, "EICT": {"formula": [
        {name: "1", votes: 10},
        {name: "2", votes: 5},
        {name: "3", votes: 8}
    ],
    "Primer Semestre": [
        {name: "1", votes: 10},
        {name: "2", votes: 5},
        {name: "3", votes: 8}
    ],
    "Segundo Semestre": [
        {name: "1", votes: 10},
        {name: "2", votes: 5},
        {name: "3", votes: 8}
    ],
    "Tercer Semestre": [
        {name: "1", votes: 10},
        {name: "2", votes: 5},
        {name: "3", votes: 8}
    ],
    "Cuarto Semestre": [
        {name: "1", votes: 10},
        {name: "2", votes: 5},
        {name: "3", votes: 8}
    ]}
}

const test = data["economia"]["formula"];
console.log(test);




const Results = () =>{

    const [selected, setSelected] = useState("formula");
    const [faculty, setFaculty] = useState("economia");
    
    const options = [{value: "formula", label: "Formula Presidencial"},
                {value: "Primer Semestre", label: "Primer Semestre"},
                {value: "Segundo Semestre", label: "Segundo Semestre"},
                {value: "Tercer Semestre", label: "Tercer Semestre"},
                {value: "Cuarto Semestre", label: "Cuarto Semestre"}];

    const options2 = [{value: "economia", label: "Economia"},
                    {value: "EICT", label: "EICT"}];

    const handleChange = event => {
        setSelected(event.target.value);
    };

    const handleChange2 = event =>{
        setFaculty(event.target.value);
    }
    console.log(faculty);
    console.log(selected);
    
    return(
        <>
        <NavB />
        <div className='margin'>
            <br /><br /><br />
            <h1>Resultados Votaciones a Consejo Estudiantil 2022</h1>
            <br />
            <select value={faculty} onChange={handleChange2}>
                {options2.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
            <select value={selected} onChange={handleChange}>
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
            <ChartVotes data={data[faculty][selected]} />
            
        </div>
        </>
    );
}

export default Results;