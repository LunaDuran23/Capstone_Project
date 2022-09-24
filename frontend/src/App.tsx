import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FacultyInfo from './Components/FacultyInfo';
import ListInfo from './Components/ListInfo';

import Home from './Components/Home';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/signUp" element={<SignUp />} />

            <Route path="/CEICT" element={<FacultyInfo faculty={{name: 'EICT'}} />} />
            <Route path="/creacion" element={<FacultyInfo faculty={{name: 'creacion'}} />} />
            <Route path="/ciencia-politica-gdu" element={<FacultyInfo faculty={{name: 'gdu'}} />} />
            <Route path="/ciencias-humanas" element={<FacultyInfo faculty={{name: 'humanas'}} />} />
            <Route path="/jurisprudencia" element={<FacultyInfo faculty={{name: 'juris'}} />} />
            <Route path="/RRII" element={<FacultyInfo faculty={{name: 'RRII'}} />} />

            <Route path="/CEICT/verde" element={<ListInfo data={{faculty: 'CEICT', name:'verde'}}/>}/>
            <Route path="/CEICT/roja" element={<ListInfo data={{faculty: 'CEICT', name:'roja'}}/>}/>
            <Route path="/CEICT/azul" element={<ListInfo data={{faculty: 'CEICT', name:'azul'}}/>}/>
            <Route path="/creacion/verde" element={<ListInfo data={{faculty: 'creacion', name:'verde'}}/>}/>
            <Route path="/creacion/roja" element={<ListInfo data={{faculty: 'creacion', name:'roja'}}/>}/>
            <Route path="/creacion/azul" element={<ListInfo data={{faculty: 'creacion', name:'azul'}}/>}/>
            <Route path="/ciencia-politica-gdu/verde" element={<ListInfo data={{faculty: 'gdu', name:'verde'}}/>}/>
            <Route path="/ciencia-politica-gdu/roja" element={<ListInfo data={{faculty: 'gdu', name:'roja'}}/>}/>
            <Route path="/ciencia-politica-gdu/azul" element={<ListInfo data={{faculty: 'gdu', name:'azul'}}/>}/>
            <Route path="/ciencias-humanas/verde" element={<ListInfo data={{faculty: 'humanas', name:'verde'}}/>}/>
            <Route path="/ciencias-humanas/roja" element={<ListInfo data={{faculty: 'humanas', name:'roja'}}/>}/>
            <Route path="/ciencias-humanas/azul" element={<ListInfo data={{faculty: 'humanas', name:'azul'}}/>}/>
            <Route path="/jurisprudencia/verde" element={<ListInfo data={{faculty: 'juris', name:'verde'}}/>}/>
            <Route path="/jurisprudencia/roja" element={<ListInfo data={{faculty: 'juris', name:'roja'}}/>}/>
            <Route path="/jurisprudencia/azul" element={<ListInfo data={{faculty: 'juris', name:'azul'}}/>}/>
            <Route path="/RRII/verde" element={<ListInfo data={{faculty: 'RRII', name:'verde'}}/>}/>
            <Route path="/RRII/roja" element={<ListInfo data={{faculty: 'RRII', name:'roja'}}/>}/>
            <Route path="/RRII/azul" element={<ListInfo data={{faculty: 'RRII', name:'azul'}}/>}/>
        </Routes>
    </Router>
  );
}

export default App;
