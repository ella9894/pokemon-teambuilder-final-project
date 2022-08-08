import React, { useState } from "react";

import Auth from "../utils/auth";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const SignupForm = () => {
  return (
    <>
      <Typography variant="h4">Sign Up</Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          maxWidth: "100%",
        }}
      >
        <Stack>
          <TextField fullWidth required label="email" />
          <TextField fullWidth required label="username" />
          <TextField fullWidth required type="password" label="password" />
          <Button variant="contained" type="submit">Sign Up</Button>
        </Stack>
      </Box>
    </>
  );
};

export default SignupForm;
