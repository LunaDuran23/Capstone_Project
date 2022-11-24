import React from 'react';
import { Grid } from "@material-ui/core/";
import { useEffect, useState } from 'react';

import NavB from './NavB';
import ChartVotes from './ChartVotes';
import FacultyResult from './FacultyResults';

import './App.css';
import './Results.css';


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
    ]}, "EICT": { "formula": [
      {
        "name": "Andrea Soto",
        "votes": 10
      },
      {
        "name": "Joshua Salinas Segundo",
        "votes": 7
      },
      {
        "name": "Facundo Melgar",
        "votes": 23
      },
      {
        "name": "Voto en Blanco",
        "votes": 11
      }
    ],
    "Primer Semestre": [
      {
        "name": "Agustina Godínez Segundo",
        "votes": 5
      },
      {
        "name": "Maite Rangel",
        "votes": 1
      },
      {
        "name": "Leonardo Valverde",
        "votes": 9
      },
      {
        "name": "Voto en Blanco",
        "votes": 6
      }
    ],
    "Segundo Semestre": [
      {
        "name": "Leonardo Saldivar",
        "votes": 2
      },
      {
        "name": "Montserrat Tovar",
        "votes": 5
      },
      {
        "name": "Guadalupe Duran Segundo",
        "votes": 4
      },
      {
        "name": "Voto en Blanco",
        "votes": 2
      }
    ],
    "Tercer Semestre": [
      {
        "name": "María Alejandra Romo",
        "votes": 2
      },
      {
        "name": "Leonardo Solorio",
        "votes": 4
      },
      {
        "name": "Alessandra Velasco",
        "votes": 3
      },
      {
        "name": "Voto en Blanco",
        "votes": 10
      }
    ],
    "Cuarto Semestre": [
      {
        "name": "Julia Olivera",
        "votes": 9
      },
      {
        "name": "Ana Partida",
        "votes": 5
      },
      {
        "name": "Sophie Gaytán Segundo",
        "votes": 2
      },
      {
        "name": "Voto en Blanco",
        "votes": 4
      }
    ],
    "Quinto Semestre": [
      {
        "name": "Daniela Tejada",
        "votes": 15
      },
      {
        "name": "María Alejandra Martínez",
        "votes": 2
      },
      {
        "name": "Mariana Leyva",
        "votes": 4
      },
      {
        "name": "Voto en Blanco",
        "votes": 0
      }
    ],
    "Sexto Semestre": [
      {
        "name": "Hugo Fajardo",
        "votes": 8
      },
      {
        "name": "José Arriaga",
        "votes": 7
      },
      {
        "name": "Sara Velasco Segundo",
        "votes": 2
      },
      {
        "name": "Voto en Blanco",
        "votes": 15
      }
    ],
    "Septimo Semestre": [
      {
        "name": "Anthony Mora Tercero",
        "votes": 10
      },
      {
        "name": "Maite Casárez",
        "votes": 7
      },
      {
        "name": "Luna Sandoval",
        "votes": 12
      },
      {
        "name": "Voto en Blanco",
        "votes": 3
      }
    ],
    "Octavo Semestre": [
      {
        "name": "Juan Arevalo Segundo",
        "votes": 21
      },
      {
        "name": "Carla Díaz",
        "votes": 1
      },
      {
        "name": "Nicole Santillán Segundo",
        "votes": 12
      },
      {
        "name": "Voto en Blanco",
        "votes": 5
      }
    ]
  }
}

const test = data["economia"]["formula"];
console.log(test);




const Results = () =>{
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetch("https://nedepuserver.ddns.me:25435/api/info/get_all_round_status")
        .then(response => response.json())
        .then(data => setInfo(data))
      },[])


    const [selected, setSelected] = useState("formula");
    const [faculty, setFaculty] = useState("EICT");
    
    const options = [{value: "formula", label: "Formula Presidencial"},
                {value: "Primer Semestre", label: "Primer Semestre"},
                {value: "Segundo Semestre", label: "Segundo Semestre"},
                {value: "Tercer Semestre", label: "Tercer Semestre"},
                {value: "Cuarto Semestre", label: "Cuarto Semestre"},
                {value: "Quinto Semestre", label: "Quinto Semestre"},
                {value: "Sexto Semestre", label: "Sexto Semestre"},
                {value: "Septimo Semestre", label: "Septimo Semestre"},
                {value: "Octavo Semestre", label: "Octavo Semestre"}];

    const options2 = [{value: "EICT", label: "EICT"}];

    const handleChange = event => {
        setSelected(event.target.value);
    };

    const handleChange2 = event =>{
        setFaculty(event.target.value);
    }


    try{
        let data2 = JSON.stringify(info);
        let final = JSON.parse(data2).payload;
        let data_final = {"EICT": final["Escuela de Ingenieria Ciencia y Tecnología"],};
        console.log(data_final);
        return(
            <>
        <NavB />
        <div className='margin'>
            <br />
            <h1 style={{textAlign: 'center'}}>Resultados Votaciones a Consejo Estudiantil 2022</h1>
            <br /><br /><br />
            <Grid container>
            <Grid item xs={3}> 
                <div style={{paddingBottom: '100px', marginRight: '100px'}}></div>
                <div className='input_style' >
                <select value={faculty} onChange={handleChange2}>
                {options2.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
                </select><br />< br/>
                <select value={selected} onChange={handleChange}>
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select> 
                </div>
            </Grid>
            <Grid item xs={6}>
                <ChartVotes data={data[faculty][selected]} />
            </Grid>
        </Grid>
            
        </div>
        </>
    );
        
    }catch{
        return(
            <>
        <NavB />
        <h1></h1>
        </>
    );        
    }
        
}

export default Results;