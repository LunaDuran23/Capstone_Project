import React from 'react';
import NavB from './NavB';

import { useState, useEffect } from "react"; 
import './SignUp.css'


function SignUp(){

  const initialValues = { name: "", surname: "", email: "", password: "", gender: "", dateOfBirth: Date(), universityID: Number(), faculty: Number(), semester: Number()};
  const [confirm, setConfirm] = useState({password2: ""});
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({name: "", surname: "", email: "", password: "", gender: "", dateOfBirth: "", universityID: ""});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const password_change2 = (e) => {
    const { name, value } = e.target;
    setConfirm({ ...confirm, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues, confirm));
    setIsSubmit(true);
  };

  useEffect(() => {
    //console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formValues, formErrors, isSubmit]);

  const validate = (values, c) => {
    const errors = {name: "", surname: "", email:"", password:"", dateOfBirth: "", gender: "", universityID: ""};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Nombre es requerido!";
    }
    if (!values.name) {
      errors.name = "Apellido es requerido!";
    }
    if (!values.email) {
      errors.email = "Correo es requerido!";
    } else if (!regex.test(values.email)) {
      errors.email = "Este correo no cumple con el formato requerido!";
    }
    if(!values.gender) {
      errors.gender = "Género es requerido!"
    }
    if(!values.dateOfBirth) {
      errors.dateOfBirth = "Fecha de nacimiento es requerida!";
    }if(!values.universityID) {
      errors.universityID = "Cédula es requerida";
    }
    if (!values.password) {
      errors.password = "Contraseña es requerida";
    } else if (values.password.length < 7) {
      errors.password = "Contraseña debe tener más de 7 caracteres";
    } if(c.password2 !== values.password){
      errors.password = "Contraseñas no coinciden";
    }
    return errors;
  };

  console.log(formValues);


    return (
      <div>
        <NavB/>
        <div className='margin_sign'>
        <form onSubmit={handleSubmit}>
        <span className="title">Crear una cuenta</span>
            <div className='two-inputs'>
              <input
                type="text"
                name="name"
                placeholder="Nombres"
                value={formValues.name}
                onChange={handleChange}
              /> &ensp;
              <input
                type="text"
                name="surname"
                placeholder="Apellidos"
                value={formValues.surname}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.name}</p>
            

            <div className='input-style'>
              <input
                type="text"
                name="email"
                placeholder="Correo electrónico"
                value={formValues.email}
                onChange={handleChange}
              />

            <p>{formErrors.email}</p>

            <input
                type="text"
                name="Numero"
                placeholder="Numero"
              />
            <p></p>
              
            <input
                type="number"
                name="universityID"
                placeholder="CC"
                value={formValues.universityID}
                onChange={handleChange}
            />
      
            <p>{formErrors.universityID}</p>

            <label>Fecha de Nacimiento</label><p></p>
            <input type="date" name="dateOfBirth" value={formValues.dateOfBirth} onChange={handleChange} />
            <p>{formErrors.dateOfBirth}</p>
            </div>

          <div className='select' onChange={handleChange}>
            <p>Genero</p>
            <input type="radio" name="gender" value="M" checked={formValues.gender === "M"} />&ensp;<label>Masculino</label>&ensp;
            <input type="radio" name="gender" value="F" checked={formValues.gender === "F"} />&ensp;<label>Femenino</label>
            <p>{formErrors.gender}</p>
          </div>

          <div className='two-inputs'>
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formValues.password}
                onChange={handleChange}
            />&ensp;
            <input
                type="password"
                name="password2"
                placeholder="Confirme contraseña"
                value={confirm.password2}
                onChange={password_change2}
            />

            <p>{formErrors.password}</p>
          </div>

            <div className='input-style'>
              <button>Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default SignUp;