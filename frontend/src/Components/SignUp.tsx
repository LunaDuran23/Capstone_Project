import React from 'react';
import NavB from './NavB';
import { useNavigate } from 'react-router';

import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  ModalFooter
  } from 'reactstrap';

import { useState, useEffect } from "react"; 
import './SignUp.css'
import img from './urosario.png';


const options = [{value: "", label: "Escoja una opción"},
                {value: 0, label: "Escuela de Ingeniería, Ciencia y Tecnología"},
                {value: 1, label: 'Facultad de Economia'},
                {value: 2, label: 'Facultad de Jurisprudencia'},
                {value: 3, label: 'Facultad de Administración'}];


function SignUp(){

  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [selectedFile, setSelectedFile] = useState(img);
  const [preview, setPreview] = useState();
  //console.log(selectedFile);
  

  const initialValues = { name: "", surname: "", email: "", password: "", gender: "", dateOfBirth: Date(), universityID: Number(), semester: Number()};
  const [confirm, setConfirm] = useState({password2: ""});
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({name: "", surname: "", email: "", password: "", gender: "", dateOfBirth: "", universityID: ""});
  const [isSubmit, setIsSubmit] = useState(false);
  const [selected, setSelected] = useState(options[0].value);

  const changeState = () =>{
    setOpen(!open);
    setData("");
}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleChange2 = event => {
    setSelected(event.target.value);
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

  const [base64Data, setBase64Data] = useState<string | string>('');

  const handleReaderLoaded = (e) =>{
    console.log("file uploaded 2:", e);
    let binaryString = e.target.result;
    console.log(binaryString);
    //setBase64Data(btoa(binaryString));
  }

  const onSelectFile = e => {
        //console.log(e.target.files[0]);
        let file = e.target.files[0];
        setSelectedFile(file);
        console.log(e.target.files);
        console.log(e.target.files[0]);
    }
  
    function convertFile(files: FileList|null) {
    if (files) {
      const fileRef = files[0] || ""
      const fileType: string= fileRef.type || ""
      console.log("This file upload is of type:",fileType)
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload=(ev: any) => {
        // convert it to base64
        setBase64Data(`data:${fileType};base64,${btoa(ev.target.result)}` as string)
      }
    }
  }

  console.log(base64Data);

  const validate = (values, c) => {
    const errors = {name: "", surname: "", email:"", password:"", dateOfBirth: "", gender: "", universityID: ""};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      setOpen(false);
      errors.name = "Nombre es requerido!";
    }
    if (!values.name) {
      setOpen(false);
      errors.name = "Apellido es requerido!";
    }
    if (!values.email) {
      setOpen(false);
      errors.email = "Correo es requerido!";
    } else if (!regex.test(values.email)) {
      setOpen(false);
      errors.email = "Este correo no cumple con el formato requerido!";
    }
    if(!values.gender) {
      setOpen(false);
      errors.gender = "Género es requerido!"
    }
    if(!values.dateOfBirth) {
      setOpen(false);
      errors.dateOfBirth = "Fecha de nacimiento es requerida!";
    }if(!values.universityID) {
      setOpen(false);
      errors.universityID = "Cédula es requerida";
    }
    if (!values.password) {
      setOpen(false);
      errors.password = "Contraseña es requerida";
    } else if (values.password.length < 7) {
      setOpen(false);
      errors.password = "Contraseña debe tener más de 7 caracteres";
    } if(c.password2 !== values.password){
      setOpen(false);
      errors.password = "Contraseñas no coinciden";
    }
    return errors;
  };

  const [post, setPost] = useState({});
  
  
  const[a, setA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(false);
  

  const handleClick = async (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setData("¿Desea ingresar a la página?");
    let file = base64Data;
    if (typeof file != undefined){
      
    }
    try {
      const new_user = {
        "carnet_upload": selectedFile,
        "name": formValues.name,
        "surname": formValues.surname,
        "universityID": formValues.universityID,
        "gender": formValues.gender,
        "dateOfBirth": "2022-11-11",
        "faculty": selected,
        "semester": formValues.semester,
        "email": formValues.email,
        "password": formValues.password
      }

      const formData  = new FormData();
      formData.append("carnet_upload", selectedFile);
      formData.append("name", formValues.name);
      formData.append("surname", formValues.surname);
      formData.append("universityID", formValues.universityID.toString());
      formData.append("gender", formValues.gender);
      formData.append("dateOfBirth", formValues.dateOfBirth);
      formData.append("faculty", selected.toString());
      formData.append("semester", formValues.semester.toString());
      formData.append("email", formValues.email);
      formData.append("password", formValues.password);

      const plainFormData = Object.fromEntries(formData.entries());
	    const formDataJsonString = JSON.stringify(plainFormData);
      console.log(plainFormData);
      console.log(formDataJsonString);

      const response = await fetch('https://nedepuserver.ddns.me:25435/api/auth/register', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(`Error! status: ${response}`);
      }else{
        setState(true);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setPost(result);
    } catch (err) {
      console.log('error');
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
     if (Object.keys(formErrors).length === 0 && isSubmit) {

      console.log(formValues);
    }
    
   
  }, [formValues, formErrors, isSubmit, selectedFile]);


    return (
      <div>
        <NavB/>
        <div className='margin_sign'>
        <form onSubmit={handleSubmit}>
        <h1 className='title'>Crear una cuenta</h1>
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
            <p>{formErrors.name}  {formErrors.surname}</p>
            

            <div className='input-style'>
              <input
                type="text"
                name="email"
                placeholder="Correo electrónico"
                value={formValues.email}
                onChange={handleChange}
              />

            <p>{formErrors.email}</p>

            <label>Cédula</label><p></p>
            <input
                type="number"
                name="universityID"
                placeholder="CC"
                value={formValues.universityID}
                onChange={handleChange}
            />
      
            <p>{formErrors.universityID}</p>

            <div className='two-inputs'>
              <select value={selected} onChange={handleChange2}>
                {options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>&ensp;
              <input
                  type="number"
                  name="semester"
                  placeholder="Semestre"
                  value={formValues.semester}
                  onChange={handleChange}
              />
            </div><br></br>

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

            <label style={{fontSize: '15px'}}>Carné Universidad</label><p></p>
            <input type='file' onChange={onSelectFile}></input>
            <br /><br />
            <div className='input-style'>
              <button onClick={handleClick}>Registrarse</button>
            </div>
          </form>
        </div>

        <Modal isOpen={state} >
          <ModalHeader>¡Se ha registrado exitosamente!</ModalHeader>
          <ModalBody>
              {data}
          </ModalBody>
          <ModalFooter>
              <Button color='primary' onClick={() => navigate('/logIn')}>Aceptar</Button>
              <Button onClick={changeState}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}

export default SignUp;