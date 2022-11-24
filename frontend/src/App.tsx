import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import FacultyInfo from './Components/FacultyInfo';
import ListInfo from './Components/ListInfo';
import DefaultInfo from './Components/DefaultInfo';
import DefaultCandidates from './Components/DefaultCandidates';

import Home from './Components/Home';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import VotingFormula from './Components/VotingFormula';
import VotingSemester from './Components/VotingSemester';
import Results from './Components/Results';

function App() {


  const facultys = {
    1: "economia",
    0: "EICT",
    2: "jurisprudencia",
    3: "administracion"
  };

  return (
    <Router>
        <Routes>
            <Route path="/" element = {<Home facultys={facultys} />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/signUp" element={<SignUp />} />

            <Route path="/EICT" element={<FacultyInfo faculty_id={0} name={'EICT'} />} />
            <Route path="/economia" element={<DefaultInfo name={'economia'}/>} />
            <Route path="/jurisprudencia" element={<DefaultInfo name={'jurisprudencia'} />} />
            <Route path="/administracion" element={<DefaultInfo name={'administracion'} />} />

            <Route path="/EICT/ListaOliva" element={<ListInfo voting_list_id={0} name={"Oliva"}/>} />
            <Route path="/EICT/ListaRoja" element={<ListInfo voting_list_id
            ={1} name={"Roja"}/>} />
            <Route path="/EICT/ListaNaranja" element={<ListInfo voting_list_id={2} name={"Naranja"}/>} />

            <Route path="/economia/lista" element={<DefaultCandidates/>} />
            <Route path="/jurisprudencia/lista" element={<DefaultCandidates/>} />
            <Route path="/administracion/lista" element={<DefaultCandidates/>} />

            <Route path="/votaciones" element={<VotingFormula />} />
            <Route path="/votaciones/semestre" element={<VotingSemester/>} />

            <Route path="/resultados" element={<Results />} />
        </Routes>
    </Router>
  );
}

export default App;