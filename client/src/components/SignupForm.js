import React, { useState } from "react";
import { Button, Stack, TextField, Typography, Alert } from "@mui/material";
import { Box } from "@mui/system";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', username: '', password: ''});
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value})
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: {...userFormData}
      });

      console.log(data);

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username:  '',
      email: '',
      password: '',
    })
  }

  return (
    <>
      <Typography variant="h4">Sign Up</Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          maxWidth: "100%",
        }}
        onChange={handleInputChange}
        onSubmit={handleFormSubmit}
      >
        <Stack>
          <TextField fullWidth required label="email" name="email" value={userFormData.email} />
          <TextField fullWidth required label="username" name="username" value={userFormData.username} />
          <TextField fullWidth required type="password" name="password" label="password" value={userFormData.password} />
          <Button variant="contained" type="submit">Sign Up</Button>
          <br />
          {error && <Alert severity="error">There was a problem signing up.</Alert>}
        </Stack>
      </Box>   
    </>
  );
};

export default SignupForm;
