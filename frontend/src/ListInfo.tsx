import React from 'react';

import NavB from './NavB';
import './App.css';


const ListInfo = ({data}) =>{
    console.log(data.name);
    return(<>
        <NavB />
        <div className='margin'>
            <h1>Hola somos la lista {data.name} de {data.faculty}</h1>
        </div>
    </>
    );
}

export default ListInfo;