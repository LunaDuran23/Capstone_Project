import React from 'react';
import NavB from './NavB';
import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
  } from "@material-ui/core";
import { useState } from "react"; 
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
    const { heading, submitButton } = useStyles();

    const [json] = useState<string>();
  
    return ( <Container>
        <NavB/>,
      {/* <Container maxWidth="xs"> */}
      <Container className="formulary" maxWidth="xs">      
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