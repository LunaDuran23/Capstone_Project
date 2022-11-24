import React from 'react';
import NavB from './NavB';

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';

import './LogIn.css'
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  ModalFooter
  } from 'reactstrap';
function LogIn(){
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [state, setState] = useState(false);
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({email:"", password:""});
  const [isSubmit, setIsSubmit] = useState(false);

  //const [token, setToken] = useState("vacio");
  let navigate = useNavigate();

  let is_valid = false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleClick = async () =>{
    setIsLoading(true);

    try {
      const response = await fetch('https://nedepuserver.ddns.me:25435/api/auth/token', {
        method: 'POST',
        mode: 'cors',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          "grant_type": "",
          "username": formValues.email,
          "password": formValues.password,
          "scope": "",
          "client_id": "",
          "client_secret": ""
        }),
      })

      if (!response.ok) {
        throw new Error(`Error! status: ${response}`);
      }else{
        const result = await response.json();
        console.log(formValues.email);
        console.log(formValues.password);
        // console.log(response.body)
        //console.log('result is: ', result.access_token);

        //setToken(result.access_token);
        //localStorage.setItem("token", token);
        localStorage.setItem("token",result.access_token);

        setOpen(true);

        setIsLoading(false);

        // console.log(result.access_token)
        // setPost(result);

        /////////

        // const saved =  localStorage.getItem("token");

        //const initialValue = JSON.parse(saved);
        //console.log(saved || "Vacio");
        is_valid = true;
        navigate('/');
    }

    }
    catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }


  // useEffect(() => {
  //   // storing input name
  //   localStorage.setItem("token", token);}, [token]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formValues, formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {email:"", password:""};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } 
    return errors;
  };


    return (
      <>
      <div>
        <NavB/>
        <div className='margin_log'>
        <form onSubmit={handleSubmit}>
        <span className="title">¡Bienvenido de Vuelta!</span>
              <div className='input-style'>

              <label>Correo electrónico</label><br></br>
              <div className='pad'></div>
              <input
                type="text"
                name="email"
                placeholder="Ingrese su correo electrónico"
                value={formValues.email}
                onChange={handleChange}
              />
            <p>{formErrors.email}</p>
            <div className='pad'></div>
            <label>Contraseña</label><br></br>
            <div className='pad'></div>
              <input
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={formValues.password}
                onChange={handleChange}
              />
            <p>{formErrors.password}</p>
            <div className='pad'></div>
            <button className="fluid ui button blue" onClick={handleClick}>Ingresar</button>
          </div>
          </form>
          </div>
            {/* <Modal isOpen={open} >
            <ModalHeader>¡Se ha registrado exitosamente!</ModalHeader>
            <ModalBody>
                {data}
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={() => navigate('/')}>Aceptar</Button>
            </ModalFooter>
          </Modal> */}
          </div>
          </>
    );
}

export default LogIn;