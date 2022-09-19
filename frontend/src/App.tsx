import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import CEICT from './Components/faculty/CEICT';
import CECN from './Components/faculty/CECN';
import Creacion from './Components/faculty/Creacion'
import Economia from './Components/faculty/Economia';
import GDU from './Components/faculty/GDU';
import Humanas from './Components/faculty/Humanas';
import Juris from './Components/faculty/Juris';
import Medicina from './Components/faculty/Medicina';
import Psicologia from './Components/faculty/Psicologia';
import Rehab from './Components/faculty/Rehab';
import RRII from './Components/faculty/RRII';

import Oliva from './Components/faculty/CEICT/Oliva';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/CEICT" element={<CEICT />} />
            <Route path="/CECN" element={<CECN />} />
            <Route path="/economia" element={<Economia />} />
            <Route path="/creacion" element={<Creacion />} />
            <Route path="/ciencia-politica-gdu" element={<GDU />} />
            <Route path="/ciencias-humanas" element={<Humanas />} />
            <Route path="/jurisprudencia" element={<Juris />} />
            <Route path="/medicina" element={<Medicina />} />
            <Route path="/rehabilitacion" element={<Rehab />} />
            <Route path="/psicologia" element={<Psicologia />} />
            <Route path="/RRII" element={<RRII />} />

            <Route path="/CEICT/oliva" element={<Oliva />} />
        </Routes>
    </Router>
  );
}

export default App;
