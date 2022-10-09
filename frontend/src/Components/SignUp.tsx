import React from 'react';
import NavB from './NavB';

import { useState, useEffect } from "react"; 
import './SignUp.css'

/*https://github.com/Hacker0x01/react-datepicker*/
import DatePicker from "react-datepicker/dist/react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function SignUp(){
  const [startDate, setStartDate] = useState(new Date());

  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({username:"",email:"",password:""});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formValues, formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {username: "", email:"", password:"", CC:"", numero: ""};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };


    return (
      <div>
        <NavB/>
        <div className='margin_sign'>
        <form onSubmit={handleSubmit}>
        <span className="title">Crear una cuenta</span>
            <div className='two-inputs'>
              <input
                type="text"
                name="username"
                placeholder="Nombres"
                value={formValues.username}
                onChange={handleChange}
              /> &ensp;
              <input
                type="text"
                name="username"
                placeholder="Apellidos"
              />
            </div>
            <p>{formErrors.username}</p>
            

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
                type="text"
                name="CC"
                placeholder="CC"
            />
      
            <p></p>

            <label>Fecha de Nacimiento</label><p></p>

            <DatePicker id = "bir_date"selected={startDate} onChange={(date) => setStartDate(date)} />
            <p></p>
            </div>

          <div className='select'>
            <p>Genero</p>
            <input type="radio" name="M" value="Masculino" />&ensp;<label>Masculino</label>&ensp;
            <input type="radio" name="F" value="Femenino" />&ensp;<label>Femenino</label>
            <p></p>
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