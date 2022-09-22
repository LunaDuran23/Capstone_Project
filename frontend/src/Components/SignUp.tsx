import React from 'react';
import NavB from './NavB';
import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
  } from "@material-ui/core";
  import { useState, useEffect } from "react"; 
import './SignUp.css'


const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    margin: theme.spacing(1, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
})); 

function SignUp(){
    const initialValues = { username: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({username:"",email:"",password:""});
    const [isSubmit, setIsSubmit] = useState(false);  
    const { heading, submitButton } = useStyles();
    const [json] = useState<string>();

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
      const errors = {username: "", email:"",password:""};
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
      <Container id="formulary_ext">
      <Container id = "formulary_int">      
        <Typography className={heading} variant="h3">
          Sign Up 
        </Typography>
        <form>
        <TextField
            variant="outlined"
            margin="normal"
            label="Nombres"
            fullWidth
            required
          />
        <TextField
            variant="outlined"
            margin="normal"
            label="Apellidos"
            fullWidth
            required
          />          
        <TextField
            variant="outlined"
            margin="normal"
            label="Número de Celular"
            fullWidth
            required
          />                                  
          <TextField
            variant="outlined"
            margin="normal"
            label="Correo Electrónico"
            fullWidth
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Contraseña"
            type="password"
            fullWidth
            required
          />          
          <TextField
            variant="outlined"
            margin="normal"
            label="CC"
            fullWidth
            required
          />          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Sign Up
          </Button>
          {json && (
            <>
              <Typography variant="body1">
                Below is the JSON that would normally get passed to the server
                when a form gets submitted
              </Typography>
              <Typography variant="body2">{json}</Typography>
            </>
          )}
        </form>
      </Container>
      </Container>
    );
}

export default SignUp;