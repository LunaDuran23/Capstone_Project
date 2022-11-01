import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FacultyInfo from './Components/FacultyInfo';
import ListInfo from './Components/ListInfo';

import Home from './Components/Home';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import VotingFormula from './Components/VotingFormula';
import VotingSemester from './Components/VotingSemester';

function App() {
  
  
  const facultys = {
    0: "economia",
    1: "EICT",
    2: "jurisprudencia",
    3: "administracion" 
  };
  
  return (
    <Router>
        <Routes>
            <Route path="/" element = {<Home facultys={facultys} />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/signUp" element={<SignUp />} />

            <Route path="/economia" element={<FacultyInfo faculty_id={0} name={'economia'}/>} />
            <Route path="/EICT" element={<FacultyInfo faculty_id={1} name={'EICT'} />} />
            <Route path="/jurisprudencia" element={<FacultyInfo faculty_id={2} name={'jurisprudencia'} />} />
            <Route path="/administracion" element={<FacultyInfo faculty_id={3} name={'administracion'} />} />
            <Route path="/economia/ListaOliva" element={<ListInfo voting_list_id={0} name={"Oliva"}/>} />
            <Route path="/economia/ListaRoja" element={<ListInfo voting_list_id
            ={1} name={"Roja"}/>} />
            <Route path="/economia/ListaNaranja" element={<ListInfo voting_list_id={2} name={"Naranja"}/>} />
            <Route path="/votaciones" element={<VotingFormula />} />
            <Route path="/votaciones/semestre" element={<VotingSemester/>} />
        </Routes>
    </Router>
  );
}

export default App;