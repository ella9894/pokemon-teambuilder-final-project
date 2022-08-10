import React, { useState } from "react";
import { Button, Stack, TextField, Typography, Alert } from "@mui/material";
import { Box } from "@mui/system";

import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";


const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ username: 'owlbag', password: 'password'});
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value})
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false){
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: {...userFormData}
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username:  '',
      email: '',
      password: '',
    })
  }

  return (
    <>
      <Typography variant="h4">Login</Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          maxWidth: "100%",
        }}
        onSubmit={handleFormSubmit}
        onChange={handleInputChange}
      >
        <Stack>
          <TextField fullWidth required label="username" name="username" value={userFormData.username} />
          <TextField fullWidth required type="password" label="password" name="password" value={userFormData.password} />
          <Button variant="contained" type="submit">Login</Button>
          <br />
          {error && <Alert severity="error">There was a problem logging in.</Alert>}
        </Stack>
      </Box>
    </>
  );
};

export default LoginForm;
